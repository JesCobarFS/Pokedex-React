import React, { useState, useEffect} from 'react'
import {  SafeAreaView } from 'react-native'
import { getPokemonApi, getPokemonDetailslUrlApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';
export default function Pokedex() {

    const [pokemons, setPokemons] = useState([]);

    const [nextUrl , setNextUrl] = useState(null);

  

    useEffect(()=> {
        (async () => {
            await loadPokemons();
        })()
    },[]);

    const  loadPokemons = async () => {
        try {
            const response = await getPokemonApi(nextUrl);

            setNextUrl(response.next);
            
            const pokemosArray = [];

            for await (const pokemon of response.results){

                const pokemonDetails = await getPokemonDetailslUrlApi(pokemon.url);

                pokemosArray.push({
                    id: pokemonDetails.id,
                    name: pokemonDetails.name,
                    order: pokemonDetails.order,
                    image: pokemonDetails.sprites.other['official-artwork'].front_default,
                    type: pokemonDetails.types[0].type.name
                });
            }

            setPokemons([...pokemons, ...pokemosArray]);



        } catch (error) {
            console.error(error);
        }
    }

    return (
    <SafeAreaView>
        <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl}>Pokedex</PokemonList>
    </SafeAreaView>
    )
}
