import React, {useState, useEffect, useCallback}from 'react'
import { Text,  } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonsFavoriteApi } from '../api/favorite'
import { getPokemonDetailsApi } from '../api/pokemon';
import useAuth from '../hooks/useAuth';
import NoLogged from '../components/NoLogged';
import PokemonList from "../components/PokemonList";

export default function Favorite() {

  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if(auth){
        (async() => {
  
          const response = await getPokemonsFavoriteApi();
  
          const pokemosArray = [];
  
          for await (const id of response){
  
              const pokemonDetails = await getPokemonDetailsApi(id);
  
              pokemosArray.push({
                  id: pokemonDetails.id,
                  name: pokemonDetails.name,
                  order: pokemonDetails.order,
                  image: pokemonDetails.sprites.other['official-artwork'].front_default,
                  type: pokemonDetails.types[0].type.name
              });
          }
  
          setPokemons(pokemosArray);
  
        })();
      }
      
    },[auth])
  )

 
  return !auth ? (
     <NoLogged/>
  ) : (
    <PokemonList pokemons={pokemons}/>
  )
}
