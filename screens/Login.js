import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Prihlásenie'
    };

    constructor() {
        super()
        
        this.state = {
            name: '',
            password: '',
            errorNotAllDataProvided: ''
        }
    }

    updateName(new_name) {
        this.setState({
            name: new_name
        });
    }
    
    updatePassword(new_pwd) {
        this.setState({
            password: new_pwd
        });
    }

    updateErrorNotAllDataProvided(new_errText) {
        this.setState({
            errorNotAllDataProvided: new_errText
        });
    }

    async sendLoginForm() {
        let name = this.state.name;
        let password = this.state.password;
        
        console.log("Name is: " + name);

        // verify if any data provided
        if (name == '' || password == '') {
            console.log('WARN: Some info missing');
            this.updateErrorNotAllDataProvided('Prosím vypľň všetky polia');
            return;
        }

        // empty the error since data are provided
        this.updateErrorNotAllDataProvided('');
        
        // POST new user
        console.log('Before Login POST')
        try {
            let resp = await fetch('http://10.0.2.2:8080/sessions', {
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
        
            // handle 4xx statuses
            if (resp.status == 400) {
                console.log("WARN: " + respBody)
                this.updateErrorNotAllDataProvided(respBody);
            }
            else if (resp.status == 401) {
                console.log("WARN: " + respBody)
                this.updateErrorNotAllDataProvided('Zlé meno alebo heslo.');
            }
            else if (resp.status == 201) {
                // Login successfull             
                // store 'must have' data to global variables
                const { navigate } = this.props.navigation

                console.log('Login successfull')
                global.bloggerId = respBody;
                global.token = resp.headers.get('token')
                navigate('Home')
            }
            else {
                console.log('WARN: login did not catch any if else statemant - check it out: ', respBody)
            }
        }
        catch (error) {
            console.log("ERROR: fetch ended up in catch error state in Login")
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Input
                        inputStyle={styles.input}
                        placeholder='  Meno'
                        onChangeText={this.updateName.bind(this)}
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
                        placeholder=' Heslo'
                        secureTextEntry={true}
                        onChangeText={this.updatePassword.bind(this)}
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
                    {this.state.errorNotAllDataProvided}
                </Text> 
                <Button 
                    title='Prihlás sa' 
                    type='solid' 
                    containerStyle={styles.buttonContainer} 
                    buttonStyle={styles.button}
                    onPress={this.sendLoginForm.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 200,
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
