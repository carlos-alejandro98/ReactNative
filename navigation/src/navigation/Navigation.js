import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import ContactStack from './ContactStack';


const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='home' component={HomeStack} options={{ title: 'Home' }} />
            <Drawer.Screen name='contact' component={ContactStack} options={{ title: 'Contact' }} />
        </Drawer.Navigator>
    );
}


/* export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='home' component={HomeStack} options={{ title: 'Home' }} />
            <Tab.Screen name='contact' component={ContactStack} options={{ title: 'Contact' }} />
        </Tab.Navigator>
    );
}
 */
