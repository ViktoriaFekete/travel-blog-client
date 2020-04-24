import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'


export default function MainFrame(props) {
    const [name, setName] = React.useState('');
    const [errorName, setErrorName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorNotAllDataProvided, setErrorNotAllDataProvided] = React.useState('');

    async function sendRegistrationForm() {
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
        
        // if 400 is returned - username already exists
        if (resp.status == 400) {
            setErrorName('Používateľské meno už existuje')
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
                onPress={sendRegistrationForm}
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
