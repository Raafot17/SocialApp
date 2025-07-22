export type PostType = {
_id: string;
body: string;
image?: string;
user:UserType;
createdAt: string;
comments:commentsType[];
}

export type UserType = {
    _id: string;
    name: string;
    photo?: string;
}


export type commentsType = {
    _id: string;
    content: string;
    commentCreator: UserType;
    post: string;
    createdAt: string;

}