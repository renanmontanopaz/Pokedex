type PokemonType = {
    type: string
}
export type Request = {
    id: number;
    types: PokemonType[]
}
export type Pokemon = {
    name: string
    url: string
    id: number
    types: PokemonType[]
}