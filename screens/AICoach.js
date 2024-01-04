import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Keyboard } from 'react-native';

import open_api_key from '../components/open_api_key'; // Import your OpenAI API key

const AICoach = () => {

    const [bodyArea, setBodayArea] = useState('');
    const [workoutTime, setWorkoutTime] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [gender, setGender] = useState('');
    const [workPlan, setWorkoutPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const workoutTypes = [
        "Cardio",
        "Upper Body",
        "Lower Body",
        "Full Body",
    ];

    const genders = [
        "Female", "Male"
    ];

    const generateWorkoutPlan = async () => {
        Keyboard.dismiss();
        setLoading(true);

        const prompt = `Create a ${workoutType} workout plan for ${gender}, focused on ${bodyArea} for ${workoutTime} minutes, including estimated calories burned. `;
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ "role": "user", "content": prompt }],
                    temperature: 0.7,
                    // max_tokens: 150,
                },
                {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${open_api_key}`,
                        'Content-Type': 'application/json'

                    }
                }
            );
            setWorkoutPlan(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error generated workout plan: ', error);
            setWorkoutPlan('Failed to generate workout plan.');
        } finally {
            setLoading(false);
     
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: "center" }} >
                <Image
                    source={{ uri: 'https://t4.ftcdn.net/jpg/01/79/81/77/360_F_179817756_QzTocli57q9G6a1Oe7kJtoMS5dNMU8cl.jpg' }}
                    style={{ width: "100%", height: 180 }}
                />
                <Text style={{ marginTop: 30, fontWeight: 'bold', fontSize: 20 }}>
                    Customize Your Workout Plan
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    {genders.map((gen, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.genderButton,
                                gender === gen && styles.selectedButton
                            ]}
                            onPress={() => setGender(gen)}
                        >
                            <Text>{gen}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        {workoutTypes.map((type, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    workoutType === type && styles.selectedButton
                                ]}
                                onPress={() => setWorkoutType(type)}
                            >
                                <Text>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    
                    </View>

                    <TextInput
                        style={[styles.input, { borderColor: bodyArea ? 'lightgray' : 'gray' }]}
                        placeholder="Targeted Body Area (e.g., arms, glutes)"
                        value={bodyArea}
                        onChangeText={setBodayArea}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: bodyArea ? 'lightgray' : 'gray' }]}
                        placeholder="Workout Duration (in minutes)"
                        value={workoutTime}
                        onChangeText={setWorkoutTime}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity
                        style={styles.genButton}
                        onPress={generateWorkoutPlan}
                    >
                        <Text style={styles.buttonText}>Create Workout Plan</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator size="large" />}
                    {!loading && workPlan && (
                        <Text style={styles.plan}>{workPlan}</Text>
                    )}
                </View>


        </ScrollView>
    );

    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    input: {
        width: '85%',
        height: 40,
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        borderRadius: 10, // Rounded corners

    },
    button: {
        backgroundColor: '#e7e7e7',
        padding: 10,
        margin:5,
        // width: '80%',
        alignItems: 'center',
        borderRadius: 10
    },
    genderButton: {
        backgroundColor: '#e7e7e7',
        padding: 10,
        margin: 5,

        width: '41%',
        alignItems: 'center',
        borderRadius: 10
    },
    selectedButton: {
        backgroundColor: 'lightgreen',
    },
    genButton: {
        backgroundColor: '#720801',
        padding: 10,
        margin: 10,
        width: '85%',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    plan: {
        marginTop: 20,
        width: '85%',
        marginHorizontal: 20, // Add horizontal margin for spacing
        padding:30,
        fontWeight: 'bold',
        backgroundColor: '#fff', // White background for the card
        borderRadius: 20, // Rounded corners
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
        fontSize: 16, // Adjust font size as needed
        color: '#333', // Text color
    }
});

export default AICoach;
