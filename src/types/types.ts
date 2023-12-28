export interface IAction {
    action: string;
    api: ((id: number) => {});
}