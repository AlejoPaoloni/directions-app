import * as FileSystem from 'expo-file-system'

import { fetchAddress, insertAddress } from '../db'

import { MAP } from '../constants'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'


export const addPlace = (title, image, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`);

        if (!response.ok) { throw new Error('No se ha podido comunicar con Google Maps API') };

        const resData = await response.json();
        if (!resData.results) { throw new Error('No se han encontrado datos para las coordenadas seleccionadas') };

        console.log('ResData', resData)

        const address = resData.results[0].formatted_address;

        console.log('address', address)

        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }

        const result = await insertAddress(
            title,
            Path,
            address,
            location.lat,
            location.lng
        )

        console.log('Db result: ', result)

        dispatch({
            type: ADD_PLACE, payload: {
                id: result.insertId,
                title,
                image: Path,
                address,
                lat: location.lat,
                lng: location.lng
            }
        })
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await fetchAddress()
            console.log('Db result: ', result.rows._array)
            dispatch({type: LOAD_PLACES, payload: {places: result.rows._array}})
        } catch (error) {
            throw error
        }
    }
}