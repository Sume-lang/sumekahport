export interface ItineraryItems {
    id?: string,
    day: number,
    title: string,
    desc: string
}
export interface Itinerary {
    id?: string;
    title: string;
    category: "hiking" | "camping" | "adventure";
    slug: string;
    price: number;
    desc: string;
    img: string;
    contentImage: string;
    day: number;
    night: number;
    date?: string; // Opsional
    itineraries: ItineraryItems[];
    additionalnote: string;
}