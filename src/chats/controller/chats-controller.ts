import AppUserApi from "../api/app-user-api.js";
import ChatsApi from "../api/chats-api.js";
import { toIdMap } from "../../common/infrastructure/utils/converters.js";
import UsersApi, { UserInfo } from "../api/users-api.js";

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

class ChatsController {
    private readonly _appUserApi = new AppUserApi();
    private readonly _chatsApi = new ChatsApi();
    private readonly _usersApi = new UsersApi();

    async getAppUserInfo(): Promise<AppUserInfo> {
        const userInfo = await this._appUserApi.getUserInfo();

        let displayName = userInfo?.login ?? "";
        if (userInfo?.display_name) {
            displayName = userInfo.display_name;
        } else if (userInfo?.first_name || userInfo?.second_name) {
            displayName = `${userInfo.first_name ?? ""} ${userInfo.second_name ?? ""}`;
        }

        return {
            displayName,
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

    findUsers(searchString: string): Promise<UserInfo[] | null> {
        return this._usersApi.searchUsers(searchString);
    }
}

export default ChatsController;
