import type {
  AvatarFormData,
  CardData,
  CardFormData,
  UserData,
  UserFormData,
} from "../utils/types.js";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export default class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: this.headers,
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  public async getUserInfo(): Promise<UserData> {
    return await this.request<UserData>("/users/me");
  }

  public async getInitialCards(): Promise<CardData[]> {
    return await this.request<CardData[]>("/cards");
  }

  public async setUserInfo(data: UserFormData): Promise<UserData> {
    return await this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async setUserAvatar(data: AvatarFormData): Promise<UserData> {
    return await this.request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async addCard(data: CardFormData): Promise<CardData> {
    return await this.request<CardData>("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async deleteCard(cardId: string): Promise<void> {
    await this.request<unknown>(`/cards/${cardId}`, { method: "DELETE" });
  }

  public async changeLikeStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return await this.request<CardData>(`/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
    });
  }
}
