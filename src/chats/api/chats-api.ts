import Api from "../../common/http/api";
import config from "../../config/config";

interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
}

interface ChatUserInfo {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    role: ChatUserRole;
}

type ChatUserRole = "admin" | "regular";

class ChatsApi {
    private readonly _api = new Api(`${config.apiUrl}/chats/`);

    getAll(): Promise<ChatInfo[]> {
        return this._api
            .get("")
            .then(response => {
                if (response.status !== 200) return [];
                try {
                    return JSON.parse(response.response as string);
                } catch {
                    return [];
                }
            })
            .catch(() => []);
    }

    async getUnreadMessagesCount(chatId: number): Promise<number | null> {
        return this._api
            .get(`/new/${chatId}`)
            .then(response => {
                if (response.status !== 200) return null;
                try {
                    const data = JSON.parse(response.response as string);
                    return data.unread_count;
                } catch {
                    return null;
                }
            })
            .catch(() => null);
    }

    create(title: string): Promise<boolean> {
        return this._api
            .post("", { title })
            .then(response => response.status === 200)
            .catch(() => false);
    }

    delete(chatId: number): Promise<boolean> {
        return this._api
            .delete("", { chatId })
            .then(response => response.status === 200)
            .catch(() => false);
    }

    uploadAvatar(chatId: number, avatar: File): Promise<boolean> {
        const data = new FormData();
        data.append("chatId", chatId.toString(10));
        data.append("avatar", avatar);

        return this._api
            .uploadForm("avatar", data)
            .then(response => response.status === 200)
            .catch(() => false);
    }

    async getChatUsers(chatId: number): Promise<ChatUserInfo[]> {
        return this._api
            .get(`${chatId}/users`)
            .then(response => {
                if (response.status !== 200) return [];
                try {
                    return JSON.parse(response.response as string);
                } catch {
                    return [];
                }
            })
            .catch(() => []);
    }

    async addChatUsers(chatId: number, userIds: number[]): Promise<boolean> {
        return this._api
            .put(`users`, { chatId, users: userIds })
            .then(response => response.status === 200)
            .catch(() => false);
    }

    async removeChatUsers(chatId: number, userIds: number[]): Promise<boolean> {
        return this._api
            .delete(`users`, { chatId, users: userIds })
            .then(response => response.status === 200)
            .catch(() => false);
    }
}

export default ChatsApi;
