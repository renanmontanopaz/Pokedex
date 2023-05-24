import {Pokedex} from '../components/Pokedex/index.tsx'
import {Header} from "../components/Header";
import {PokemonContextProvider} from "../contexts";
export const RoutePokedex = () =>{
    return (
        <>
            <PokemonContextProvider>
            <Header />
            <Pokedex />
            </PokemonContextProvider>
        </>
    )
}