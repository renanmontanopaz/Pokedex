import styles from './index.module.css';
import usePokemonContext from "../../hooks/Pokemon";
import {CardPokemon} from "../PokemonCard";
import { useState} from "react";

export const Pokedex = () =>{

    const {pokemonState} = usePokemonContext();
    const [search, setSearch] = useState<string>("");

    const filterPokemon = pokemonState.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>800 <strong>Pokemons</strong> for you to choose your favorite</h1>
                <input

                    type="text"
                    placeholder='Encuentra tu pokémon...'
                    className={styles.search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <>
                    <CardPokemon pokemon={filterPokemon}/>
                </>
            </div>

        </section>
    )
}