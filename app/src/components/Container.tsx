import React from 'react';
import { StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export default function Container({ children, style }: ContainerProps) {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
        backgroundColor: 'white',
        padding: 20
    }
})