export interface UserData {
    name: string;
    job: string;
}
interface UserInfoSelectors {
    nameSelector: string;
    jobSelector: string;
}
export default class UserInfo {
    private nameElement;
    private jobElement;
    constructor({ nameSelector, jobSelector }: UserInfoSelectors);
    getUserInfo(): UserData;
    setUserInfo({ name, job }: UserData): void;
}
export {};
//# sourceMappingURL=UserInfo.d.ts.map