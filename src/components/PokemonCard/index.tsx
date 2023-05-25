import {useEffect, useState} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";
import usePokemonContext from "../../hooks/Pokemon";
import styles from "../PokemonCard/index.module.css";
import useModalContext from "../../hooks/Modal";
import {ModalPokemon} from "../Modal";

type CardPokemonProps = {
    pokemon:Pokemon[];
}
export const CardPokemon: React.FC<CardPokemonProps> = ({ pokemon }) => {

    const {pokemonState, setPokemonState} = usePokemonContext();
    //const countcard = 9;

    const [search, setSearch] = useState<string>("");
    const {setPokemonModalState, setOpenModalState, openModalState} = useModalContext()

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get('/?limit=100')
            const {results} = response.data;
            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const {id, types, image, abilities, stats} = await getMoreInfo(pokemon.url)
                    return {
                        name: pokemon.name,
                        id,
                        types,
                        image,
                        abilities,
                        stats,
                    }
                })
            )
            //console.log(payloadPokemons);
            setPokemonState(payloadPokemons);
            console.log(pokemonState)
        }
        getAllPokemons();
    },[])

    async function getMoreInfo(url: string): Promise<Request>{
        const response = await api.get(url)
        const {id, types, abilities, stats} = response.data;
        return{
            id,
            types,
            abilities,
            stats,
            image: response.data.sprites.other.home.front_default,
        }
    }

    const handleClick = (value: string) => {
        setSearch(value);
        const pokemonModal = pokemonState.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase()));
        setPokemonModalState(pokemonModal);
        setOpenModalState(true)
        console.log(openModalState)
    }

    function CardsPokemon (){
        type PokemonType = 'stile' | 'dark' | 'rock' | 'grass' | 'bug' | 'ice' | 'water' | 'fire' | 'fighting' | 'dragon' | 'normal' | 'gosth' | 'poison' | 'psychic' | 'fairy' | 'ghost' | 'ground' | 'electric';


        const changeColors: Record<PokemonType, string> = {

            stile: '#A1A1A1',
            dark: '#A1A1A1',
            rock: '#A1A1A1',
            grass: '#70A83B',
            bug: '#70A83B',
            ice: '#A2CFF0',
            water: '#A2CFF0',
            fire: '#F76745',
            fighting: '#F76745',
            dragon: '#F76745',
            normal: '#76AADB',
            gosth: '#76AADB',
            poison: '#A974BC',
            psychic: '#A974BC',
            fairy: '#A974BC',
            ghost: '#A974BC',
            ground: '#9B597B',
            electric: '#F7C545'
        }

        return (

            <div className={styles.conteiner_Pokemon_Card}>
                {pokemon.map((poke) => (
                    <article key={poke.id} className={styles.conteiner_card} onClick={() => handleClick(poke.name)}>
                        <article className={styles.conteiner_card_left}>
                                <h1 className={styles.card_name}>{poke.name}</h1>
                            <article className={styles.card_divs}>
                                <div className={styles.card_atribute_value}>{poke.stats[1].base_stat}</div>
                                <div className={styles.card_atribute_value}>{poke.stats[2].base_stat}</div>
                            </article>
                            <article className={styles.card_atribute}>
                                <p>Attack</p>
                                <p>Defense</p>
                            </article>
                            <article className={styles.card_type}>
                                <div style={{ backgroundColor: changeColors[poke.types[0].type.name as PokemonType] }} className={styles.card_type_value}>{poke.types[0].type.name}</div>
                                <div style={{ backgroundColor: poke.types.length == 2 ? changeColors[poke.types[1].type.name as PokemonType] : changeColors[poke.types[0].type.name as PokemonType] }} className={styles.card_type_value_right}>{poke.types.length == 2 ? poke.types[1].type.name : poke.types[0].type.name}</div>
                            </article>
                        </article>
                        <article style={{ backgroundColor: changeColors[poke.types[0].type.name as PokemonType] }} className={styles.conteiner_card_right}>
                            <img src={poke.image} alt="Imagem do card" className={styles.conteiner_card_img} />
                        </article>
                    </article>
                ))};
            </div>
        );
    }

    return (
        <>
        <CardsPokemon/>
        <ModalPokemon/>
            </>
    )
}
