export interface IAction {
    action: string;
    api: ((id: string) => void);
}