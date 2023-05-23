import { createContext, useState } from 'react';
import { Pokemon } from '../models/Pokemon'

type PokemonContextProviderProps = {
    children:React.ReactNode
}

export type PokemonContextProps = {
    pokemonState: Pokemon[],
    setPokemonState: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const DEFAULT_VALUE = {
    pokemonState: [],
    setPokemonState: () => [{}],
}

const PokemonContext = createContext<PokemonContextProps>(DEFAULT_VALUE);

const PokemonContextProvider = ({ children }: PokemonContextProviderProps) => {
    const [pokemonState, setPokemonState] = useState<Pokemon[]>([]);
    return (
        <PokemonContext.Provider value={{ pokemonState, setPokemonState }}>
            {children}
        </PokemonContext.Provider>
    )
}

export {PokemonContextProvider};
export default PokemonContext;