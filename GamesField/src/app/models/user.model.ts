export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picture: string,
    lastPlayed: string | null,
    myGames: string[]
}