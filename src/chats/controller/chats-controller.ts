import AppUserApi from "../api/app-user-api.js";
import ChatsApi from "../api/chats-api.js";
import { toIdMap } from "../../common/utils/converters.js";
import UsersApi from "../api/users-api.js";

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
            displayName: userInfo ? getUserName(userInfo) : "",
            avatar: userInfo?.avatar ? `https://ya-praktikum.tech${userInfo.avatar}` : "",
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

    delete(chatId: number): Promise<boolean> {
        return this._chatsApi.delete(chatId);
    }

    uploadAvatar(chatId: number, avatar: File): Promise<boolean> {
        return this._chatsApi.uploadAvatar(chatId, avatar);
    }

    async findUsers(chatId: number, searchString: string): Promise<ChatUserInfo[]> {
        if (searchString) {
            return this._searchUsers(searchString);
        }
        return this._getChatUsers(chatId);
    }

    addUser(chatId: number, oldUsers: ChatUserInfo[], newUserId: number): Promise<boolean> {
        const userIds = oldUsers.map(getId).concat([newUserId]);
        return this._chatsApi.setChatUsers(chatId, userIds);
    }

    removeUser(chatId: number, userId: number): Promise<boolean> {
        return this._chatsApi.removeChatUsers(chatId, [userId]);
    }

    private async _searchUsers(searchString: string): Promise<ChatUserInfo[]> {
        const foundUsers = await this._usersApi.searchUsers(searchString);
        return foundUsers.map(user => ({
            id: user.id,
            name: getUserName(user),
            avatar: user.avatar,
            role: null,
        }));
    }

    private async _getChatUsers(chatId: number): Promise<ChatUserInfo[]> {
        const chatUsers = await this._chatsApi.getChatUsers(chatId);
        return chatUsers.map(user => {
            return {
                id: user.id,
                name: getUserName(user),
                avatar: user.avatar,
                role: user.role,
            };
        });
    }
}

function getUserName(user: {
    display_name?: string | null;
    first_name?: string | null;
    second_name?: string | null;
    login?: string | null;
}): string {
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

function getId<TId>(item: { id: TId }): TId {
    return item.id;
}

export default ChatsController;
