import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FitnessCards from '../components/FitnessCards';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { FitnessItems } from '../Context';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

    // useContext hook to access the FitnessItems context in the component
    const { calories, minutes, workout, } = useContext(FitnessItems);
    const navigation = useNavigation();  // Initializing navigation hook for navigating between screens

  
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={{ marginTop: 0, backgroundColor:'#505050'}}>
      <View style={{ backgroundColor: "#720801", paddingTop: 40, paddingHorizontal: 20, height: 160, width: "100%" }}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 40}}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, marginTop:30}}>SIX PACK IN 30 DAYS</Text>
        </View>

        {/* Cards Row  */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>

          <View style={styles.shadowCards}>

            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{calories.toFixed(2)}</Text>
            <Text>KCAL</Text>
          </View>

          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>

          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minutes}</Text>
            <Text>MINUTES</Text>
          </View>
        </View>
          </View>
          
          <FitnessCards />
          
          {/* AICOACH */}
          <TouchableOpacity onPress={() => navigation.navigate("AICoach")} style={{alignItems: 'center', justifyContent: "center", marginTop: 0, marginBottom: 10}} >
            <Image style={{ width: "90%", height: 120, borderRadius: 12 }} source={{uri: 'https://t4.ftcdn.net/jpg/01/79/81/77/360_F_179817756_QzTocli57q9G6a1Oe7kJtoMS5dNMU8cl.jpg'}} />
            <Text style={{position: "absolute", color: "white", fontSize: 16, fontWeight: "bold", left: 40, top: 15}}>AI COACH</Text>
            <MaterialCommunityIcons name="lightning-bolt" size={30} color="#dfbe04" style={{position: "absolute", bottom: 15, left: 30}} />
          </TouchableOpacity>
          
    </ScrollView>
  )

}

export default HomeScreen

const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: "#ffffff",
    width: "32%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});