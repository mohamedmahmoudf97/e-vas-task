export interface Blog {
    id: number;
    title: string;
    body: string;
}
export interface BlogFormProp { 
    blog?: Blog,
    save: (data: BlogFormFields|Blog) => void,
    saving: boolean,
    onCancel: () => void
}

export interface BlogFormFields {
    id?: number|null|undefined;
    title: string;
    body: string;
}