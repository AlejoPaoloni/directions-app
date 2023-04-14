import * as addressAction from '../store/places.actions'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FlatList } from 'react-native'
import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places)

    const renderItem = (data) => (
        <PlaceItem
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            onSelect={() => navigation.navigate("Detalle", {
                placeID: data.item.id,
            }
            )}
        />
    )

    useEffect(() => {
        dispatch(addressAction.loadPlaces())
    }, [])

    return (
        <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

export default PlaceListScreen;
