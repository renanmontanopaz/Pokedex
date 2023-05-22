import  {useEffect, useState} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";
import styles from './index.module.css';
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import * as React from 'react';

export const Pokedex = () =>{

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() =>{
        async function getAllPokemons(){
            const response = await api.get('')
            const {results} = response.data;
            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const {id, types} = await getMoreInfo(pokemon.url)

                    return {
                        name: pokemon.name,
                        id,
                        types
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
            id,types
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
                <FormControl sx={{ m: 1, width: 200 }}>
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
                <FormControl sx={{ m: 1, width: 200 }}>
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
                <FormControl sx={{ m: 1, width: 200 }}>
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
            </div>
        </section>
    )
}