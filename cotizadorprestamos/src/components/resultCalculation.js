import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function ResultCalculation(props) {
    const { capital, interest, months, total, errorMessage } = props;
    return (
        <View style={styles.content}>
            {total && (
                <View style={styles.boxResult}>
                    <Text style={styles.title}>RESUMEN</Text>

                    <DataResult title="Cantidad solicitada: " value={`${capital} CLP`} />
                    <DataResult title="Interés %: " value={`${interest} %`} />
                    <DataResult title="Plazos: " value={`${months} meses`} />
                    <DataResult title="Pago Mensual: " value={`${total.monthlyfree} CLP`} />
                    <DataResult title="Total a Pagar: " value={`${total.totalPayable} CLP`} />

                </View>
            )}
            <View>
                <Text style={styles.error}>{errorMessage}</Text>
            </View>
        </View>
    );
}

function DataResult(props) {
    const { title, value } = props;
    return (
        <View style={styles.value}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 40
    },
    value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    error: {
        textAlign: 'center',
        color: '#f00',
        fontWeight: 'bold',
        fontSize: 20,
    },

    boxResult: {
        padding: 30,
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },

});

