import React, { createContext, useState } from 'react';
import { Pokemon } from '../../models/Pokemon.ts'

type PokemonContextProviderProps = {
    children:React.ReactNode
}

export type PokemonContextProps = {
    pokemonState: Pokemon[],
    setPokemonState: React.Dispatch<React.SetStateAction<Pokemon[]>>,
    filterPokemonState: Pokemon[],
    setFilterPokemonState: React.Dispatch<React.SetStateAction<Pokemon[]>>,
}

const DEFAULT_VALUE = {
    pokemonState: [],
    setPokemonState: () => [{}],
    filterPokemonState: [],
    setFilterPokemonState: () => [{}],
}

const PokemonContext = createContext<PokemonContextProps>(DEFAULT_VALUE);

const PokemonContextProvider = ({ children }: PokemonContextProviderProps) => {
    const [pokemonState, setPokemonState] = useState<Pokemon[]>([]);
    const [filterPokemonState, setFilterPokemonState] = useState<Pokemon[]>([])
    return (
        <PokemonContext.Provider value={{ pokemonState, setPokemonState, filterPokemonState, setFilterPokemonState}}>
            {children}
        </PokemonContext.Provider>
    )
}

export {PokemonContextProvider};
export default PokemonContext;