import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Home(props) {
    
    const {navigation} = props;
    
    return(
        <View>
            <Text>Estamos en la home</Text>
            <Button title='Ir a About' onPress={() => navigation.navigate("about")}/>
            <Button title='Ir a Contact' onPress={() => navigation.navigate("contact")}/>
            <Button title='Ir a Cursos' onPress={() => navigation.navigate('contact', {screen: 'courses'})}/>
        </View>
    );
}