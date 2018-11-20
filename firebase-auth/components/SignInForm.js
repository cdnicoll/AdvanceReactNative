import React from 'react'
import {
    View
} from 'react-native'
import {
    FormLabel,
    FormInput,
    Button
} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-cdnicoll-one-time-password.cloudfunctions.net'

class SignInForm extends React.Component {
    state = {
        phone: '',
        code: ''
    }

    handleSubmit = async () => {
        const { phone, code } = this.state;
        try {
            let { data } = await axios.post(ROOT_URL+'/verifyOneTimePassword', { phone, code });

            firebase.auth().signInWithCustomToken(data.token);
        } catch(err) {
            console.log(err.response.data);
        }
    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput onChangeText={ phone => this.setState({ phone }) } />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput onChangeText={ code => this.setState({ code }) } />
                </View>
                <Button
                    title="Submit"
                    onPress={ this.handleSubmit }
                />
            </View>
        )
    }
}

export default SignInForm;
