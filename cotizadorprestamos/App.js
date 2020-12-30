import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  YellowBox,
  Button
}
  from 'react-native';
import colors from './src/utils/colors';
import Footer from './src/components/Footer';
import Form from './src/components/Form';
import ResultCalculation from './src/components/resultCalculation';

YellowBox.ignoreWarnings(["Picker has been extracted"]);
YellowBox.ignoreWarnings(["YellowBox has been replaced with LogBox"]);

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(capital && interest && months){
      calculate();
    }else{
      reset();
    }
  }, [capital, interest, months]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage('Añade la cantidad que deseas solicitar');
    } else if (!interest) {
      setErrorMessage('Añade el interés del prestamo');
    } else if (!months) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);

      setTotal({
        monthlyfree: fee.toFixed(0).replace('.', ','),
        totalPayable: ((fee * months).toFixed(0).replace('.', ',')),
      });
    }
  }

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>

      <ResultCalculation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}
      />

      <Footer calculate={calculate} />

    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: "center",
  },

  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },

  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fff",
    marginTop: 15,
  }
});