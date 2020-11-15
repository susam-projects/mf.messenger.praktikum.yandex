import Api from "../../common/infrastructure/api/api.js";

interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
}

class ChatsApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/chats/");

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
}

export default ChatsApi;
