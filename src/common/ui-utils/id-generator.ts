const idGenerator = {
    _ids: new Set<string>(),

    getNewId(): string {
        let id: string;
        do {
            id = this.generateId(20);
        } while (this._ids.has(id));

        this._ids.add(id);
        return id;
    },

    generateId(length: number): string {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; ++i) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    clear(): void {
        this._ids.clear();
    },
};

export default idGenerator;
