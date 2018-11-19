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

class SignupForm extends React.Component {
    render() {
        return (
            <View>
                <FormLabel>Enter Phone Number</FormLabel>
                <FormInput />
                <Button title="submit" />
            </View>
        );
    }
}

export default SignupForm;
