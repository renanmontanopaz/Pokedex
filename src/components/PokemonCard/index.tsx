import {useEffect} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";
import usePokemonContext from "../../hooks/Pokemon";
import styles from "../PokemonCard/index.module.css";
import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";

type CardPokemonProps = {
    pokemon:Pokemon[];
}

export const CardPokemon: React.FC<CardPokemonProps> = ({ pokemon }) => {



    const {pokemonState, setPokemonState} = usePokemonContext();
    const countcard = 9;

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get(`/?limit=${countcard}&offset=${countcard}`)
            const {results} = response.data;
            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const {id, types, image, attack, defense} = await getMoreInfo(pokemon.url)
                    return {
                        name: pokemon.name,
                        id,
                        types,
                        image,
                        attack,
                        defense
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
        const {id, types} = response.data;
        return{
            id,
            types,
            image: response.data.sprites.other.home.front_default,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat
        }
    }
    console.log(pokemonState)

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
            <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }} sx={{ gap: 5, gapRow: 0, display: 'flex', justifyContent: 'center' }}>
                {pokemon.map((pokemon) =>(
                    <Grid xs={3} sm={3} md={3} key={pokemon.id} sx={{ maxWidth: 0 }}>
                        <Card key={pokemon.id} className={styles.grid} sx={{ maxWidth: 400, minWidth: 320, flexDirection: 'row', display: 'flex', marginTop: 5}}>
                            <Box key={pokemon.id} sx={{ display: 'flex', flexDirection: 'column'}}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography key={pokemon.name} component="div" variant="h5">{pokemon.name}</Typography>
                                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                        <Box  sx={{ '& > :not(style)': {m: 1, width: 25, height: 25, alignItems: 'center', flexDirection: 'column'},}}>
                                            <Avatar key={pokemon.attack} sx={{ color: 'black', bgcolor: 'orange', border: 'black', fontSize: 15}}>{pokemon.attack}</Avatar>
                                            <p className={styles.paragraph}>Attack</p>
                                        </Box>
                                        <Box sx={{'& > :not(style)': {m: 1, width: 25, height: 25, alignItems: 'center', flexDirection: 'center'},}}>
                                            <Avatar key={pokemon.defense} sx={{ color: 'black', bgcolor: '#448aff', border: 'black', fontSize: 15}}>{pokemon.defense}</Avatar>
                                            <p className={styles.paragraph}>Defense</p>
                                        </Box>
                                    </Box>
                                    <Box className={styles.card_type}>
                                        <div style={{ backgroundColor: changeColors[pokemon.types[0].type.name as PokemonType] }} className={styles.card_type_value}  >{pokemon.types[0].type.name}</div>
                                        <div style={{ backgroundColor: pokemon.types.length == 2 ? changeColors[pokemon.types[1].type.name as PokemonType] : changeColors[pokemon.types[0].type.name as PokemonType] }} className={styles.card_type_value_right}>{pokemon.types.length == 2 ? pokemon.types[1].type.name : pokemon.types[0].type.name}</div>
                                    </Box>
                                </CardContent>
                            </Box>
                            <div style={{ backgroundColor: changeColors[pokemon.types[0].type.name as PokemonType] }}>
                                <img className={styles.image} src={pokemon.image} alt={pokemon.name}></img>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <CardsPokemon/>
    )
}
