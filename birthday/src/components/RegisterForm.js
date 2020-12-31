import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

export default function RegisterForm(props) {
    const { changeForm } = props;
    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                placeholderTextColor="#969696"
            />
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    }
});
