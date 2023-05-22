type PokemonType = {
    type: string
}

export type Request = {
    id: number;
    types: PokemonType[]
    image: string
    attack: number
    defense: number
}
export type Pokemon = {
    name: string
    url: string
    id: number
    types: PokemonType[]
    image: string
    attack: number
    defense: number
}