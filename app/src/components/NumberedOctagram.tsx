import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MyText from 'components/MyText';

interface ImageProps {
    number: number
}

export default function NumberedOctagram({number}: ImageProps ) {
    return (
        <View style={styles.container}>
          <Image source={require("images/SurahStarIcon.png")} style={styles.image} />
          <View style={styles.numberContainer}>
            <MyText style={styles.number}>{number}</MyText>
          </View>
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
    },
    numberContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    });