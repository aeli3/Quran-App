import { Image, StyleSheet, View, FlatList } from "react-native";
import MyText from "components/MyText";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Container from "./src/components/Container";
import VerseCard from "./src/components/VerseCard";
import { useEffect } from "react";
import { useQuranVerses } from "./src/hooks/useQuranVerses";
import useQuranChapters from "./src/hooks/useQuranChapters";
import useQuranAudio from "./src/hooks/useQuranAudio";

export default function Surah() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation()
    const { data: quran, isSuccess: isSuccessQuran } = useQuranChapters()
    const { data: verses, isSuccess: isSuccessVerses } = useQuranVerses();
    const { data: audio, isSuccess: isSuccessAudio } = useQuranAudio();
    var selectedSurah = isSuccessQuran ? quran.chapters[Number(id) - 1] : {}

    // update navbar title
    useEffect(() => {
        navigation.setOptions({ title: selectedSurah.name_simple})
    }, [])

    return (
        <Container>
            {
                isSuccessQuran?
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image} 
                        source={require("images/surah_header.png")}
                    />
                    <View style={styles.overlayContainer}>
                        <MyText style={styles.overlayTitle}>{selectedSurah.name_simple}</MyText>
                        <MyText style={styles.overlayText}>{selectedSurah.translated_name.name}</MyText>
                        <View style={styles.breakLine}></View>
                        <MyText style={styles.overlayText}>{selectedSurah.revelation_place.toUpperCase()} {selectedSurah.verses_count} VERSES</MyText>
                        <MyText style={styles.ArabicName}>{selectedSurah.name_arabic}</MyText>
                    </View>
                </View>
                :
                <MyText>...loading</MyText>
            }
            <View style={styles.FlatListContainer}>
                {
                    isSuccessVerses && isSuccessAudio ?
                    <FlatList 
                    data={verses}
                    renderItem={({ item }) =>         
                    <VerseCard
                    text={item.arabicText}
                    translation={item.translation}
                    id={item.verseNumber}
                    audioUrl={audio[Number(item.verseNumber) - 1].url}
                    />}
                    keyExtractor={item => item.verseNumber}
                    />
                    
                    :
                    <MyText>...loading</MyText>
                }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 2,
        position: 'relative',
    },
    image: {
        flex: 1,
        width: '100%',
        opacity: 0.8,
        objectFit: 'contain',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    overlayTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    overlayText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',       
    },
    breakLine: {
        width: '70%',
        opacity: 0.4,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    ArabicName: {
        paddingTop: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',       
    },
    FlatListContainer: {
        flex: 3,
    }
})