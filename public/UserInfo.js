export default class UserInfo {
    nameElement;
    jobElement;
    constructor({ nameSelector, jobSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement || !jobElement) {
            throw new Error("No se encontraron los elementos del perfil");
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            job: this.jobElement.textContent ?? "",
        };
    }
    setUserInfo({ name, job }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
    }
}
//# sourceMappingURL=UserInfo.js.map