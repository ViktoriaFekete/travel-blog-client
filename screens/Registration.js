import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'


export default function Registration({ navigation }) {
    const [name, setName] = React.useState('');
    const [errorName, setErrorName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorNotAllDataProvided, setErrorNotAllDataProvided] = React.useState('');

    // navigationOptions = {
    //     title: 'Registrácia'
    // };

    async function sendRegistrationForm(navigation) {
        // verify if any data provided
        if (name == '' || email == '' || password == '') {
            console.log('WARN: Some info missing');
            setErrorNotAllDataProvided('Prosím vypľň všetky polia')
            return;
        }

        // empty the error since data are provided
        setErrorNotAllDataProvided('')
        
        // POST new user
        console.log('Before POST')
        try {
            let resp = await fetch('http://192.168.1.107:8080/bloggers', {
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

            // if 400 is returned - username already exists
            if (resp.status == 400) {
                setErrorName('Používateľské meno už existuje')
                return;
            }

            console.log('Before Login POST')

            // user registered, now log him in and get id and token
            resp = await fetch('http://192.168.1.107:8080/sessions', {
                mode: "no-cors",   
                method: 'POST', 
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    password: password,
                })
            })
            console.log('After Login POST')
            
            let respBody = await resp.text()

            global.bloggerId = respBody;
            global.token = resp.headers.get('token')
            
            // registration was successfull 
            navigation.navigate('CreateProfile')
        }
        catch (error) {
            console.log("ERROR: fetch ended up in catch error state in Registration")
            //console.error(error);
        }
    }

    function setNameAttributes(name) {
        setName(name);
        setErrorName('')
    }

    return (
        <View style={styles.container}>
            <Text>Vytvor si vlastný účet, aby si mohol publikovať vlastné články a užívať user benefity!</Text>
            <View>
                <Input
                    inputStyle={styles.input}
                    placeholder=' Meno'
                    onChangeText={setNameAttributes}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                    errorMessage={errorName}
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
            <Text style={{color: 'red'}}>
                {errorNotAllDataProvided}
            </Text>
            <Button 
                title='Registruj' 
                type='solid' 
                containerStyle={styles.buttonContainer} 
                buttonStyle={styles.button}
                onPress={() => sendRegistrationForm(navigation)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 110,
        paddingBottom: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    input: {
        marginLeft: 7
    },
    buttonContainer: {
        padding: 5,
        paddingBottom: 20,
        height: 90 
    },
    button:{
        height: 70,
    }
});
