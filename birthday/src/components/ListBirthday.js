import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import Birthday from './Birthday';

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
    const { user } = props;
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pasatBirthday, setPasatBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        setBirthday([]);
        setPasatBirthday([]);
        db.collection(user.uid)
            .orderBy('dateBirth', 'asc')
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                });
                formatData(itemsArray);
            });
        setReloadData(false);
    }, [reloadData]);

    const formatData = (items) => {
        //Sacar fecha actual
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const birthdayTempArray = [];
        const pasatBirthdayTempArray = [];

        items.forEach((item) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000); // obtenemos la fecha actual recibida(item)
            const dateBirthday = moment(dateBirth); // creacion ddel objeto fecha con moment
            const currentYear = moment().get("year"); //obtenemos el año actual
            dateBirthday.set({ year: currentYear }); // Se actualiza a la fecha del cumpleaños

            const diffDate = currentDate.diff(dateBirthday, "days"); // Diferenciar cuanto falta de la fecha actual a la fecha del cumpleaños
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if (diffDate <= 0) {
                birthdayTempArray.push(itemTemp); //Cumpleaños de hoy
            } else {
                pasatBirthdayTempArray.push(itemTemp); // Cumpleaños pasado
            }

        });
        setBirthday(birthdayTempArray);
        setPasatBirthday(pasatBirthdayTempArray);
    };

    const deleteBirthday = (birthday) => {
        Alert.alert(
            'Eliminar Cumpleaños',
            `¿Estas seguro que deseas eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        db.collection(user.uid)
                            .doc(birthday.id)
                            .delete()
                            .then(() => {
                                setReloadData();
                            })
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <View style={styles.container}>
            {showList ? (
                <ScrollView style={styles.scrollView}>
                    {birthday.map((item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ))}

                    {pasatBirthday.map((item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ))}
                </ScrollView>

            ) : (
                    <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />
                )}

            <ActionBar showList={showList} setShowList={setShowList} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    scrollView: {
        marginBottom: 50,
        width: '100%'
    }
});

