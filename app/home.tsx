import { Image, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import MyText from "./src/components/MyText";
import { useState } from "react";
import Colors from "utils/Color";
import HorizontalNav from "components/HorizontalNav";
import SurahCard from "components/SurahCard";
import useQuranChapters from "./src/hooks/useQuranChapters";

export default function Home() {
    const { data:quran, isSuccess } = useQuranChapters();
    const [selectedNav, setSelectedNav] = useState(0)
    const navItems = ['Surah', 'Games', 'Stories', 'Discussion']

    return (
        <View style={styles.container}>
            <View>
                <MyText style={{color: Colors.GRAY, fontSize: 18}}>Assalamu alaikum</MyText>
                <MyText style={{color: Colors.MAIN, fontSize: 25}}>Ali Aarbaj</MyText> 
            </View>
            <TouchableOpacity>
                <Image style={styles.image} source={require('../assets/images/last_read.png')}/>
            </TouchableOpacity>
            <HorizontalNav 
            navItems={navItems} 
            selectedNav={selectedNav} 
            setSelectedNav={setSelectedNav}
            />
            {
                selectedNav == 0 && isSuccess
                ?
                <FlatList 
                data={quran.chapters}
                renderItem={({ item }) =>         
                <SurahCard 
                    arabicName={item.name_arabic}
                    englishName={item.name_simple}
                    revelationPlace={item.revelation_place}
                    total_verses={item.verses_count}
                    index={item.id}
                />}
                keyExtractor={item => item.id}
                />
                :
                <MyText>Loading...</MyText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
        backgroundColor: 'white',
        padding: 20
    },

    image: {
        width: '100%',
        borderRadius: 15,
    },
})