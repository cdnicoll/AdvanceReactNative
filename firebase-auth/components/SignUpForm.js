import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Button
} from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-cdnicoll-one-time-password.cloudfunctions.net'

class SignupForm extends React.Component {
    // es17 variation of handling the class state
    state = {
        phone: ''
    }

    handleSubmit = async () => {
        try {
            await axios.post(ROOT_URL+'/createUser', { phone: this.state.phone });
            await axios.post(ROOT_URL+'/requestOneTimePassword', { phone: this.state.phone });
        } catch(err) {
            console.log(err.response.data)
        }
    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                    <Button
                        title="Submit"
                        onPress={ this.handleSubmit }
                    />
                </View>
            </View>
        );
    }
}

export default SignupForm;
