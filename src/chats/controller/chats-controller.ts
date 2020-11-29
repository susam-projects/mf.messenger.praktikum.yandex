import AppUserApi from "../api/app-user-api";
import ChatsApi from "../api/chats-api";
import { toIdMap } from "../../common/utils/converters";
import UsersApi from "../api/users-api";
import config from "../../config/config";

interface AppUserInfo {
    displayName: string;
    avatar: string;
}

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unreadMessagesCount: number;
    haveUnreadMessages: boolean;
    selected: boolean;
}

export interface ChatUserInfo {
    id: number;
    name: string;
    avatar: string;
    role: ChatUserRole | null;
}

export type ChatUserRole = "admin" | "regular";

class ChatsController {
    private readonly _appUserApi = new AppUserApi();
    private readonly _chatsApi = new ChatsApi();
    private readonly _usersApi = new UsersApi();

    async getAppUserInfo(): Promise<AppUserInfo> {
        const userInfo = await this._appUserApi.getUserInfo();
        return {
            displayName: getUserName(userInfo),
            avatar: getUserAvatar(userInfo),
        };
    }

    async getChats(): Promise<ChatInfo[]> {
        const chats = await this._chatsApi.getAll();

        const unreadInfo = await Promise.all(
            chats.map(async chat => {
                const count = await this._chatsApi.getUnreadMessagesCount(chat.id);
                return {
                    id: chat.id,
                    count,
                };
            }),
        );

        const unreadInfoMap = toIdMap(unreadInfo);

        return chats.map(chatInfo => ({
            ...chatInfo,
            unreadMessagesCount: unreadInfoMap[chatInfo.id].count ?? 0,
            haveUnreadMessages: !!unreadInfoMap[chatInfo.id].count,
            selected: false,
        }));
    }

    createChat(title: string): Promise<boolean> {
        return this._chatsApi.create(title);
    }

    deleteChat(chatId: number): Promise<boolean> {
        return this._chatsApi.delete(chatId);
    }

    uploadChatAvatar(chatId: number, avatar: File): Promise<boolean> {
        return this._chatsApi.uploadAvatar(chatId, avatar);
    }

    findUsers(chatId: number, searchString: string): Promise<ChatUserInfo[]> {
        if (searchString) {
            return this._searchUsers(searchString);
        }
        return this._getChatUsers(chatId);
    }

    addUser(chatId: number, newUserId: number): Promise<boolean> {
        return this._chatsApi.addChatUsers(chatId, [newUserId]);
    }

    removeUser(chatId: number, userId: number): Promise<boolean> {
        return this._chatsApi.removeChatUsers(chatId, [userId]);
    }

    private async _searchUsers(searchString: string): Promise<ChatUserInfo[]> {
        const foundUsers = await this._usersApi.searchUsers(searchString);
        return foundUsers.map(user => ({
            id: user.id,
            name: getUserName(user),
            avatar: getUserAvatar(user),
            role: null,
        }));
    }

    private async _getChatUsers(chatId: number): Promise<ChatUserInfo[]> {
        const chatUsers = await this._chatsApi.getChatUsers(chatId);
        return chatUsers.map(user => {
            return {
                id: user.id,
                name: getUserName(user),
                avatar: getUserAvatar(user),
                role: user.role,
            };
        });
    }
}

function getUserName(
    user?: {
        display_name?: string | null;
        first_name?: string | null;
        second_name?: string | null;
        login?: string | null;
    } | null,
): string {
    if (!user) {
        return "";
    }

    if (user.display_name) {
        return user.display_name;
    }

    if (user.first_name || user.second_name) {
        return `${user.first_name} ${user.second_name}`;
    }

    if (user.login) {
        return user.login;
    }

    return "";
}

function getUserAvatar(user?: { avatar?: string | null } | null) {
    return user?.avatar ? `${config.imageStorageUrl}${user?.avatar}` : "";
}

export default ChatsController;
