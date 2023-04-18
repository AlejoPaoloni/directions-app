import { Image, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../constants';
import React from 'react'
import { useSelector } from 'react-redux'

const PlaceDetailScreen = ({ route }) => {
    const { placeID } = route.params

    const place = useSelector(state => state.places.places.find(place => place.id === placeID))

    console.log(place)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{place.title}</Text>
            <Image source={{ uri: place.image }} style={styles.image} />
            <View style={styles.location}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        marginTop: 10,
        padding: 10,
        textDecorationLine: 'underline'
    },

    image: {
        height:'35%',
        minHeight: 300,
        width: '100%'
    },

    location: {
        margin: 20,
        width: '90%',
        maxWidth: 350,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10
    },

    addressContainer: {
        padding: 20
    },

    address: {
        color: COLORS.MAROON,
        textAlign: 'center'
    }
})

export default PlaceDetailScreen
