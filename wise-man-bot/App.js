import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://your-backend-url.com/generate-response', { prompt });
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
                value={prompt}
                onChangeText={setPrompt}
            />
            <Button title="Submit" onPress={handleSubmit} />
            <Text style={styles.response}>{response}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    response: {
        marginTop: 16,
        fontSize: 18,
    },
});
