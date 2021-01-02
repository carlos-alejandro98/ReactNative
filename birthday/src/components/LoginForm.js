import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            console.log("ERROR 1");
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
            console.log("ERROR 2");
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                    })
                });
        }
        setFormError(errors);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <>

            <TextInput style={[styles.input, formError.email && styles.error]}
                placeholder="Correo Electronico"
                placeholderTextColor='#969696'
                onChange={(e) => onChange(e, 'email')}
            />

            <TextInput style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor='#969696'
                secureTextEntry={true}
                onChange={(e) => onChange(e, 'password')}
            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

function defaultValue() {
    return {
        email: "",
        password: "",
    };
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18,
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
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
    },
    error: {
        borderColor: "#940c0c",
    }
});
