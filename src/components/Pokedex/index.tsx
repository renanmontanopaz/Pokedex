import {useEffect, useState} from "react";
import api from "../../services/api.ts";
import {Pokemon, Request} from "../../models/Pokemon.ts";


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

    return
    <section>

    </section>
}