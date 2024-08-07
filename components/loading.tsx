import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react';

export type loadingProps = {
    isLoading: boolean;
};

const LoadingControl = (props: loadingProps) => {
    return (
        <View className='bg-blue-400/20 w-[100%] h-[100%] absolute justify-center items-center' style={styles.activityContainer}>
            <ActivityIndicator animating={props.isLoading} size={80} color="#2563eb" />
        </View>
    )
}

export default LoadingControl;

const styles = StyleSheet.create({
    activityContainer: {
        top: 0,
        left: 0,
        marginVertical: "auto",
        zIndex: 9
        // height: '100%',
        // width: '100%'
    }
});