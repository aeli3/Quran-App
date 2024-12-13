import { StyleSheet, View } from "react-native";
import MyText from "components/MyText";
import Colors from "../utils/Color";
import NumberedOctagram from "components/NumberedOctagram";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

interface SurahCardProps {
    arabicName: string
    englishName: string
    revelationPlace: string
    total_verses: number
    index: number
}

export default function SurahCard({arabicName, englishName, revelationPlace, total_verses, index}: SurahCardProps) {
    return (
        <Link
        asChild
        href={{
            pathname: "/surah",
            params: { id: index }
        }}
        >
            <TouchableOpacity style={styles.card}>
                <View style={styles.leftContent}>
                    <View>
                        <NumberedOctagram 
                        number={index}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <MyText numberOfLines={1} ellipsizeMode="tail">{englishName}</MyText>
                        <MyText style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
                            {revelationPlace} {total_verses} verses
                        </MyText>
                    </View>
                </View>
                <MyText style={styles.arabicName} numberOfLines={1}>
                    {arabicName}
                </MyText>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: Colors.LIGHT_GRAY,
    },
    leftContent: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 10,
    },
    textContainer: {
        paddingLeft: 10,
    },
    subText: {
        color: Colors.GRAY,
        width: 200
    },
    arabicName: {
        color: Colors.MAIN,
        flex: 1,
        textAlign: 'right',
    }
})