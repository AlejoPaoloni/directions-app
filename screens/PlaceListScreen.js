import { FlatList } from 'react-native'
import PlaceItem from '../components/PlaceItem'
import React from 'react'
import { useSelector } from 'react-redux'

const PlaceListScreen = ({ navigation }) => {
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

    return (
        <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

export default PlaceListScreen;
