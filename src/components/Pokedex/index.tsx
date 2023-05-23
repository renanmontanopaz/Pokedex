import  {useEffect, useState} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";
import styles from './index.module.css';
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
    Avatar,
    Box, Card, CardContent, CardMedia,
    Checkbox,
    FormControl, Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput, Paper,
    Select,
    SelectChangeEvent, Typography
} from "@mui/material";
import * as React from 'react';

export const Pokedex = () =>{

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

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
            console.log(payloadPokemons);
            setPokemons(payloadPokemons);
        }
        getAllPokemons()
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

    function SearchPokemon() {
        return (
            <Stack className={styles.input} spacing={3} sx={{ width: '80%', boxShadow: '4px 4px 16px rgba(1, 28, 64, 0.2)', borderRadius: '40px'}}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={pokemons.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Encontre seu Pokemon"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>
        );
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

        const [personName, setPersonName] = React.useState<string[]>([]);

        const handleChange = (event: SelectChangeEvent<typeof personName>) => {
            const {
                target: { value },
            } = event;
            setPersonName(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split('type') : value,
            );
        };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>800 <strong>Pokemons</strong> for you to choose your favorite</h1>
                <SearchPokemon/>
                <Box >
                <FormControl sx={{ m: 1, width: 200, boxShadow: '2px 2px 2px rgba(33, 33, 33, 0.1)', borderRadius: 4, border: 'none' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join('type')}
                        MenuProps={MenuProps}
                    >
                        {pokemons.map((name) => (
                            <MenuItem key={name.id} value={name.types.map((tipo) => tipo.type)}>
                                <Checkbox checked={personName.indexOf(name.name) > -1} />
                                <ListItemText primary={name.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>
                <Grid container spacing={{ xs: 6, md: 6 }} columns={{ xs: 6, sm: 8, md: 12 }} sx={{ gap: 3, display: 'flex', justifyContent: 'center' }}>
                    {pokemons.map((pokemon) =>(
                        <Grid xs={3} sm={3} md={3} key={pokemon.id} >
                            <Card className={styles.grid} sx={{ maxWidth: 400, minWidth: 320, flexDirection: 'row', display: 'flex'}}>
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
                                    </CardContent>
                                </Box>
                                    <img className={styles.image} src={pokemon.image}></img>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </section>
    )
}