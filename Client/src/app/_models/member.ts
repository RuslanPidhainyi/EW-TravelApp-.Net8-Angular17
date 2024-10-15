import { GeneralPhoto } from "./generalPhoto"

export interface Member {
    id: number
    username: string
    age: number
    generalPhotoUrl: string
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    description: string
    interests: string
    country: string
    city: string
    generalPhotos: GeneralPhoto[]
}