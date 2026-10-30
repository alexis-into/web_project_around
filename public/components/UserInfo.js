export default class UserInfo {
    nameElement;
    aboutElement;
    avatarElement;
    userId = "";
    constructor({ nameSelector, aboutSelector, avatarSelector, }) {
        const nameElement = document.querySelector(nameSelector);
        const aboutElement = document.querySelector(aboutSelector);
        const avatarElement = document.querySelector(avatarSelector);
        if (!nameElement || !aboutElement || !avatarElement) {
            throw new Error("No se encontraron los elementos del perfil");
        }
        this.nameElement = nameElement;
        this.aboutElement = aboutElement;
        this.avatarElement = avatarElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            about: this.aboutElement.textContent ?? "",
        };
    }
    getUserId() {
        return this.userId;
    }
    setUserInfo({ _id, name, about, avatar }) {
        this.userId = _id;
        this.nameElement.textContent = name;
        this.aboutElement.textContent = about;
        this.setAvatar(avatar, name);
    }
    setAvatar(avatar, name = this.nameElement.textContent ?? "") {
        this.avatarElement.src = avatar;
        this.avatarElement.alt = name;
    }
}
//# sourceMappingURL=UserInfo.js.map