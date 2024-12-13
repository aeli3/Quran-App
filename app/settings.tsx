import { useNavigation } from "expo-router";
import Container from "./src/components/Container";
import MyText from "./src/components/MyText";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "./src/utils/Color";
import { useLanguage } from "./src/hooks/useLanguage";

export default function Settings() {
    const navigation = useNavigation()
    const langs= {'English': 'en', "Dutch": 'nl', "French": 'fr'}
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        navigation.setOptions({ headerRight: () => {}})
    }, [])

    return(
        <Container>
            {Object.entries(langs).map(([langName, langValue]) => (
                <TouchableOpacity 
                key={langName} 
                style={langValue == language.value ? styles.selected : styles.tile}
                onPress={() => setLanguage({value: langValue})}
                >
                    <MyText style={langValue == language.value ? {color:'white'} : {color: 'black'}}>{langName} </MyText>
                </TouchableOpacity>
            ))}
        </Container>
    )
}

const styles = StyleSheet.create({
    tile: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GRAY
    },

    selected: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GRAY,
        backgroundColor: Colors.MAIN
    }
})