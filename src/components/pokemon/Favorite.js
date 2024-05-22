import React, { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi } from '../../api/favorite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITE_STORAGE } from '../../utils/constants';


export default function Favorite(props) {

    const { id } = props;

    const [isFavorite, setIsFavorite] = useState(undefined);
    const Icon = isFavorite ? FontAwesome : FontAwesome5;
    const [reload, setReload] = useState(false);

    console.log(isFavorite);

    useEffect(() => {
        (async () => {
            try {
                const response = await isPokemonFavoriteApi(id);
                setIsFavorite(response)
            } catch (error) {
                setIsFavorite(false);
            }
        })()
    }, [id, reload]);


    const onReloadCheckFavorite = () => {
        setReload(prev => !prev)
    }

    const addFavorite = async () => {
       
        try {
            await addPokemonFavoriteApi(id);
            onReloadCheckFavorite();
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = async () => {
      try {
          await removePokemonFavoriteApi(id);
          onReloadCheckFavorite();
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Icon name="heart" color="#fff" size={20} onPress={isFavorite ? removeFavorite : addFavorite} style={{marginRight: 20}} />
        
    )
}
