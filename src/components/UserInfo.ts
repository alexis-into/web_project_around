import type { UserData, UserFormData } from "../utils/types.js";

interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
  avatarSelector: string;
}

export default class UserInfo {
  private nameElement: HTMLElement;
  private aboutElement: HTMLElement;
  private avatarElement: HTMLImageElement;
  private userId = "";

  constructor({
    nameSelector,
    aboutSelector,
    avatarSelector,
  }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const aboutElement = document.querySelector<HTMLElement>(aboutSelector);
    const avatarElement =
      document.querySelector<HTMLImageElement>(avatarSelector);

    if (!nameElement || !aboutElement || !avatarElement) {
      throw new Error("No se encontraron los elementos del perfil");
    }

    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
    this.avatarElement = avatarElement;
  }

  public getUserInfo(): UserFormData {
    return {
      name: this.nameElement.textContent ?? "",
      about: this.aboutElement.textContent ?? "",
    };
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserInfo({ _id, name, about, avatar }: UserData): void {
    this.userId = _id;
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
    this.setAvatar(avatar, name);
  }

  public setAvatar(
    avatar: string,
    name = this.nameElement.textContent ?? "",
  ): void {
    this.avatarElement.src = avatar;
    this.avatarElement.alt = name;
  }
}
