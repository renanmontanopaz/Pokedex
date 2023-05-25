import styles from './index.module.css';
import usePokemonContext from "../../hooks/Pokemon";
import {CardPokemon} from "../PokemonCard";
import { useState} from "react";
import {ModalContextProvider} from "../../contexts/Modal";

export const Pokedex = () =>{

    const {pokemonState, setPokemonState} = usePokemonContext();
    const [search, setSearch] = useState<string>("");



        const handleCLick = (value: string) => {
            setSearch(value);
            setPokemonState(pokemonState.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase())));
            console.log(pokemonState);
        }
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>800 <strong>Pokemons</strong> for you to choose your favorite</h1>
                <input

                    type="text"
                    placeholder='Encuentra tu pokémon...'
                    className={styles.search}
                    value={search}
                    onChange={(e) => handleCLick(e.target.value)}/>
                <>
                    <ModalContextProvider>
                    <CardPokemon />
                    </ModalContextProvider>
                </>
            </div>

        </section>
    )
}