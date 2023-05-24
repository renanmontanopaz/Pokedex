import { useContext } from "react";
import PokemonContext, { PokemonContextProps } from "../../contexts/Pokemon";

export const usePokemonContext = (): PokemonContextProps => {
    const pokemonContext = useContext<PokemonContextProps> (PokemonContext);
    return pokemonContext;
}

export default usePokemonContext;