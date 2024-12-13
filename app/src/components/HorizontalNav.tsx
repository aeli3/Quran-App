import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Colors from "../utils/Color";

interface HorizontalNavProps {
    navItems: string[]
    selectedNav: Number
    setSelectedNav:  React.Dispatch<React.SetStateAction<number>>

}

export default function HorizontalNav({ navItems, selectedNav, setSelectedNav }: HorizontalNavProps) {

    return (
        <View style={styles.scrollContainer}>
            <ScrollView horizontal={true}>
                {navItems.map((navItem, key) => {
                    return(
                        <TouchableOpacity 
                        key={key}
                        onPress={() => setSelectedNav(key)}
                        style={styles.scrollButton}
                        >
                            <Text style={styles.buttonText}>{navItem}</Text>
                            {selectedNav === key && <View style={styles.selectedIndicator} />}
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.LIGHT_GRAY,
    },

    scrollButton: {
        borderBottomColor: Colors.MAIN,
        paddingRight: 40,
        paddingBottom: 15
    },
    buttonText: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.GRAY
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 30,
        height: 2,
        backgroundColor: Colors.MAIN,
    }
})