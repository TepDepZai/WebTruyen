export interface BookAdmin {
    id: string;
    img: string;
    title: string;
    author: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    createdByName?: string;
    tags?: string[];
}
export interface StateBookAdmin {
    id: string;
    title: string;
    roleBar: boolean;
    status: string;
    createdByName?: string;
}
