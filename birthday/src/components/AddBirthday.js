import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddBirthday() {

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    }

    const handlerConfirm = (date) => {
        console.log(date);
        hideDatePicker();
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    placeholderTextColor="#969696"
                />

                <View style={[styles.input, styles.datepicker]}>
                    <Text style={styles.textDate} onPress={showDatePicker}>Fecha de Nacimiento</Text>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    datepicker: {
        justifyContent: 'center'
    },
    textDate: {
        color: '#969696',
        fontSize: 18
    }

});

