import { View, Pressable, StyleSheet } from "react-native"
import MyText from "./MyText";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "../utils/Color";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

interface VerseProps {
    id: number,
    translation: string,
    text: string,
    audioUrl: string
}

export default function VerseCard({id, translation, text, audioUrl}: VerseProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const soundRef = useRef<Audio.Sound | null>(null)

    const playSound = async () => {
        if (soundRef.current) {
            await soundRef.current.playAsync();
        }

        else {
            const { sound } = await Audio.Sound.createAsync({ uri: audioUrl})
            soundRef.current = sound
            await sound.playAsync()
        }

        setIsPlaying(true);
    }

    const pauseSound = async () => {
        if (soundRef.current) {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
        }
    }

    const stopSound = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            setIsPlaying(false);
        }
    }

    // Cleanup Audio on unmount
    useEffect(() => {
        return () => {
            stopSound()
        }
    }, [])
    
    return (
        <View style={styles.verseContainer}>
            <View style={styles.verseHeader}>
                <View style={styles.circleContainer}>
                    <FontAwesome name="circle" size={28} color={Colors.MAIN} />
                    <MyText style={styles.verseNumber}>{id}</MyText>
                </View>
                <View style={styles.verseActions}>
                    <Pressable
                    android_ripple={{color: "rgba(103, 44, 188, 0.4)"}}
                    hitSlop={{ top: 20, bottom: 20, left: 20}}
                    >
                        <Feather name="share-2" size={24} color={Colors.MAIN}/>
                    </Pressable>
                    {
                        isPlaying 
                        ? 
                        <Pressable
                        android_ripple={{color: "rgba(103, 44, 188, 0.4)"}}
                        hitSlop={{ top: 20, bottom: 20, left: 20}}
                        onPress={() => pauseSound()}
                        >
                            <Feather name="pause" size={24} color={Colors.MAIN} />
                        </Pressable>
                        :
                        <Pressable
                        android_ripple={{color: "rgba(103, 44, 188, 0.4)"}}
                        hitSlop={{ top: 20, bottom: 20, left: 20}}
                        onPress={() => playSound()}
                        >
                            <Feather name="play" size={24} color={Colors.MAIN} />
                        </Pressable>   
                    }
                    <Pressable
                    android_ripple={{color: "rgba(103, 44, 188, 0.4)"}}
                    hitSlop={{ top: 20, bottom: 20, left: 20}}
                    >
                        <Feather name="bookmark" size={24} color={Colors.MAIN} />
                    </Pressable>
                </View>
            </View>
            <MyText style={styles.arabicText}>{text}</MyText>
            <MyText>{translation}</MyText>
        </View>
    )
}

const styles = StyleSheet.create({
    verseContainer: {
        padding: 10,
        gap:10,
        marginBottom: 20,
        borderBottomColor: Colors.LIGHT_GRAY,
        borderBottomWidth: 1,
    },
    verseHeader: {
        padding: 10,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    arabicText: {
        textAlign: 'right',
        fontSize: 18,
        marginBottom: 10,
    },
    verseActions: {
        flexDirection: 'row',
        gap: 20,
    },
    circleContainer: {
        position: 'relative',
        width: 30,
        height: 30,
    },
    circleImage: {
        width: '100%',
        height: '100%',
    },
    verseNumber: {
        position: 'absolute',
        top: -1,
        left: -5,
        right: 0,
        bottom: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 12,
    },
})