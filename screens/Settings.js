import * as React from 'react';

import { View, StyleSheet, Button, ToastAndroid } from "react-native";


async function logout(navigation) {
    if (global.bloggerId == null) {
        ToastAndroid.showWithGravity(
            "Niesi prihlásený",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        return;
    }
    try {
        let resp = await fetch('http://10.0.2.2:8080/sessions/' + global.bloggerId, {
            method: 'DELETE',
            headers: {
                'token': global.token
            }
        });

        let body = await resp.text();

        if(resp.status == 200) {
            ToastAndroid.showWithGravity(
                "Úspešne odhlásenie",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
            global.bloggerId = null
            global.token = null
        }
        else {
            ToastAndroid.showWithGravity(
                body,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
        }
    } catch(error) {
        console.log('fetch ended up in error state in Settings-logout()');
        console.log(error);
    };

}   

export default function LinksScreen({ navigation }) {
    return (
        <View>
        <Button 
            title='Pokračuj bez prihlásenia'
            onPress={ () => logout(navigation)}
        />
    </View>
    );
  }
  