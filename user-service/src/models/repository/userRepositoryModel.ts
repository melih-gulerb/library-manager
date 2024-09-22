export interface FindUserProperties {
    id: number
    name: string
}

class FindUserResponse implements FindUserProperties {
    public id: number
    public name: string
}