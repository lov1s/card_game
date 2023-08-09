export interface BasicData{
    image: string,
    name: string,
}
export interface CardData extends BasicData {
    id: number,
    revealed?: boolean
}