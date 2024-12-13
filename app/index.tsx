import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import Colors from "./src/utils/Color";
import { useEffect } from "react";

export default function Index() {
  const navigation = useNavigation()

  // hide header
  useEffect(() => {
    navigation.setOptions({ headerShown: false});
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} >Quran App</Text>
        <Text style={styles.subTitle} >Learn and recite the quran everyday!</Text>
      </View>
      <View style={{position: 'relative'}}>
        <Image
        style={styles.image} 
        source={require('../assets/images/kitab_card.png')}
        />
        <Link href='/home' asChild>
          <TouchableOpacity
          style= {styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.MAIN,
    flex: 1,
    alignItems: 'center',
    flexDirection: "column",
    paddingBottom: 100,
    paddingTop: 50,
    gap: 20
  },

  titleContainer: {
    width: 170,
    alignItems: 'center',
    gap: 10
  },

  button: {
    alignSelf: 'center',
    width: '50%',
    backgroundColor: Colors.ORANGE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily:"Roboto",
    color: 'white',
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },

  subTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily:"Roboto"
  },

  image: {
    flex: 0.95,
    borderRadius: 40,
    objectFit: 'contain'
  }
})
