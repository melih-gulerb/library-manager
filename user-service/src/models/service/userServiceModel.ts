export interface FindUserByIdResponseProperties {
    name: string
    books: Book
}

export interface BookProperties {
    past: Past[]
    present: Present[]
}

export interface PastProperties {
    name: string
    userScore: number
}

export interface PresentProperties {
    name: string
}

class FindByIdResponse implements FindUserByIdResponseProperties {
    public id: number
    public name: string
    public books: Book
}

class Book implements BookProperties {
    public past: Past[]
    public present: Present[]
}

class Past implements PastProperties {
    public name: string
    public userScore: number
}

class Present implements PresentProperties {
    public name: string
}