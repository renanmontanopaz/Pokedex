export type PokemonType = {
    type: {
        name: string
    }
}

export type Abilities = {
    ability: {
        name: string
        url: string
    }
}

export type Stats = {
    base_stat: {
        base_stat: number
        effort: number
        stat: Stat[]
    }
}

export type Stat = {
    name: string
    url: string
}
export type Request = {
    id: number
    types: PokemonType[]
    image: string
    abilities: Abilities[]
    stats: Stats[]
}
export type Pokemon = {
    name: string
    url: string
    id: number
    types: PokemonType[]
    image: string
    attack: number
    defense: number
    abilities: Abilities[]
    stats: Stats[]
}