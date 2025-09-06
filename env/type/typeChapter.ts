export interface Chapter {
    chapterName: string;
    chapterNumber: number;
    content: string;
    bookName: string;
    bookId: string;
    createdByName: string;
}
export interface ChapterId {
    _id: string;
    ChapterName: string;
    ChapterNumber: number;
    ChapterContent: string;
    BookName: string;
    BookId: string;
    CreatedByName: string;
}
export interface ChapterUpdate {
    chapterName: string;
    chapterNumber: number;
    content: string;
}