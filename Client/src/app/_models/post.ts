export interface Post {
    id: number;
    photoUrl: string;
    country: string;
    city: string;
    title: string;
    priceForRoad: number;
    touristPlaces: boolean;
    priceForEnter: number;
    shopsNearby: boolean;
    shops: string;
    description: string;
    //appUserId: number;
    userName: string;
}
