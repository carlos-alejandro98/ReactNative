import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaulValue());

    const register = () => {
        console.log("registrando..");
        console.log(formData);
    }

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Repetir Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />

            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

function defaulValue() {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    };
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 15,
    },
    input: {
        height: 45,
        color: "#fff",
        width: "90%",
        marginBottom: 20,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
    }
});
