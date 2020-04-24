import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'


export default function MainFrame(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function sendRegistrationForm() {
        console.log(name)
        console.log(email)
        console.log(password)

        // console.log('Before fetch 1')
        // let resp = await fetch('http://10.0.2.2:8080/articles/tile/?id=5')
        // console.log('After fetch 1')
        // let respJson = await resp.json()
        // console.log(respJson)

        console.log('Before POST')
        let resp = await fetch('http://10.0.2.2:8080/bloggers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
                username: name,
                about_me: ' ',
                password: password,
                email: email
            })
        });
        console.log('After POST')
        console.log(resp.status)

        // console.log('Before fetch 2')
        // resp = await fetch('http://10.0.2.2:8080/articles', {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'token': 'generated_token'
        //   },
        //   body: JSON.stringify({
        //     blogger_id: '5',
        //     title: 'aaaaaaaaaaaaDruhy clanok s frontu',
        //     article_text: 'CEZ EMULATOR?!?! Ty si kral...'
        //   })
        // })
        // console.log('After fetch 2')
    }

    return (
        <View style={styles.container}>
            <Text>Vytvor si vlastný účet, aby si mohol publikovať vlastné články a užívať user benefity!</Text>
            <View>
                <Input
                    inputStyle={styles.input}
                    placeholder=' Meno'
                    onChangeText={setName}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    inputStyle={styles.input}
                    placeholder=' Email'
                    onChangeText={setEmail}
                    leftIcon={
                        <Icon
                            name='at'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    inputStyle={styles.input}
                    placeholder=' Heslo'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    leftIcon={
                        <Icon
                            name='key'
                            size={24}
                            color='black'
                        />
                    }
                />
            </View>
            <Button title="Registruj" onPress={sendRegistrationForm}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 140,
        paddingBottom: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    input: {
        
    }
});
