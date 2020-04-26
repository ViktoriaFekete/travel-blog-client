import * as React from 'react';

import { View, StyleSheet, ToastAndroid } from "react-native";
import { Button } from "react-native-elements";



async function logout() {
    if (global.bloggerId == null) {
        ToastAndroid.showWithGravity(
            "Niesi prihlásený",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        return;
    }
    try {
        let resp = await fetch('http://192.168.1.107:8080/sessions/' + global.bloggerId, {
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
            console.log('User SUCCESSFULLY Logged out')
        }
        else {
            ToastAndroid.showWithGravity(
                body,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
            console.log('User NOT logged out: ' + body)

        }
    } catch(error) {
        console.log('fetch ended up in error state in Settings-logout()');
        console.log(error);
    };

}   

export default function LinksScreen() {
    return (
        <View>
        <Button 
            title='Odhlásenie'
            containerStyle={styles.button}
            onPress={ () => logout()}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 1
    }
})
  