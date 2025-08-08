export interface User {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picture: string,
    lastPlayed: string | null,
    myGames: string[]
}