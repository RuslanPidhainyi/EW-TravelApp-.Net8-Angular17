export interface Post {
    id: number;
    url: string;
    title: string;
    locationCountry: string;
    locationCity: string;
    lastCountry: string;
    lastRegion: string;
    localTransport: boolean;
    minPriceLocalTrans: number;
    maxPriceLocalTrans: number;
    travelTime: number;
    entranceFee: boolean;
    minPriceEntrFee: number;
    maxPriceEntrFee: number;
    placeStay: boolean;
    typePlaceStay: string;
    minPricePlaceStay: number;
    maxPricePlaceStay: number;
    groceryStore: boolean;
    minPriceGroceryStore: number;
    maxPriceGroceryStore: number;
    guide: boolean;
    minPriceGuide: number;
    maxPriceGuide: number;
    currency: string
    description: string;
    ownerPhotoUrl: string;
    userName: string;
}