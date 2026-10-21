export interface UserData {
  name: string;
  job: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export default class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const jobElement = document.querySelector<HTMLElement>(jobSelector);

    if (!nameElement || !jobElement) {
      throw new Error("No se encontraron los elementos del perfil");
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}
