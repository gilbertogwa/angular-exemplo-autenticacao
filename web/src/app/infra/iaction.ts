

export interface IAction {
    onCompleted: (any) => void;
    onError: (any) => void;
    onFinally: () => void;
}
