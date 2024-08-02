import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator();

function HomeScreen() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        console.log('Submitting prompt:', prompt);
        try {
            const res = await axios.post(`http://192.168.11.131:3000/generate-response`, { prompt }); // Updated URL
            console.log('Response from server:', res.data);
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wise Old Man Bot</Text>
            <TextInput
                style={styles.input}
                placeholder="Ask a question..."
                placeholderTextColor="#888"
                value={prompt}
                onChangeText={setPrompt}
            />
            <Button title="Submit" onPress={handleSubmit} color="#1e90ff" />
            <Text style={styles.response}>{response}</Text>
        </View>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#121212',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#444',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: '#ffffff',
        backgroundColor: '#1e1e1e',
    },
    response: {
        marginTop: 16,
        fontSize: 18,
        color: '#ffffff',
    },
});

registerRootComponent(App);
