import MapView, { Marker } from 'react-native-maps'
import React, { useLayoutEffect, useState } from 'react'

import { Ionicons } from 'react-native-vector-icons';
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native';

const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const initialRegion = {
        latitude: 37.4219023,
        longitude: -122.0839984,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleSaveLocation = () => {
        if(selectedLocation) {
            navigation.navigate('Nuevo', { mapLocation: selectedLocation });
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSaveLocation}>
                    <Ionicons name="md-save-outline" color="white" size={22} />
                </TouchableOpacity>
            )
        })
    }, [navigation, handleSaveLocation])

    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        })
    }

    return (
        <MapView initialRegion={initialRegion} style={styles.container} onPress={handleSelectLocation}>
            {selectedLocation && 
                <Marker
                    title='Ubicación seleccionada'
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen
