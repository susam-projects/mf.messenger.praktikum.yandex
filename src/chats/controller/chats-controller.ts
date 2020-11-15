import AppUserApi from "../api/app-user-api.js";
import ChatsApi from "../api/chats-api.js";

interface AppUserInfo {
    displayName: string;
    avatar: string;
}

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unreadMessagesCount: number;
    selected: boolean;
}

class ChatsController {
    private readonly _appUserApi = new AppUserApi();
    private readonly _chatsApi = new ChatsApi();

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
            avatar: userInfo?.avatar ?? "",
        };
    }

    async getChats(): Promise<ChatInfo[]> {
        const chats = await this._chatsApi.getAll();
        return chats.map(chatInfo => ({
            ...chatInfo,
            unreadMessagesCount: 3,
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
}

export default ChatsController;
