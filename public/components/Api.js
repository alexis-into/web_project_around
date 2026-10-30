export default class Api {
    baseUrl;
    headers;
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async request(endpoint, options = {}) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: this.headers,
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        return await this.request("/users/me");
    }
    async getInitialCards() {
        return await this.request("/cards");
    }
    async setUserInfo(data) {
        return await this.request("/users/me", {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }
    async setUserAvatar(data) {
        return await this.request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }
    async addCard(data) {
        return await this.request("/cards", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async deleteCard(cardId) {
        await this.request(`/cards/${cardId}`, { method: "DELETE" });
    }
    async changeLikeStatus(cardId, isLiked) {
        return await this.request(`/cards/${cardId}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
        });
    }
}
//# sourceMappingURL=Api.js.map