import {useEffect} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";
import usePokemonContext from "../../hooks";
import styles from "../PokemonCard/index.module.css";
import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";


export const CardPokemon = () => {

    const {pokemonState, setPokemonState} = usePokemonContext();

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get('/?limit=20&offset=20')
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

    return (
        <Grid container spacing={{ xs: 6, md: 6 }} columns={{ xs: 6, sm: 8, md: 12 }} sx={{ gap: 3, display: 'flex', justifyContent: 'center' }}>
            {pokemonState.map((pokemon) =>(
                <Grid xs={3} sm={3} md={3} key={pokemon.id} >
                    <Card key={pokemon.id} className={styles.grid} sx={{ maxWidth: 400, minWidth: 320, flexDirection: 'row', display: 'flex'}}>
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
                                    <div className={styles.card_type_value}>{pokemon.types[0].type.name}</div>
                                    <div className={styles.card_type_value_right}>{pokemon.types.length == 2 ? pokemon.types[1].type.name : pokemon.types[0].type.name}</div>
                                </Box>
                            </CardContent>
                        </Box>
                        <img className={styles.image} src={pokemon.image} alt={pokemon.name}></img>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}