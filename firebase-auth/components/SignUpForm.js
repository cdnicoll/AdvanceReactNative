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
    state = {
        phone: ''
    }

    handleSubmit = () => {
        console.log("ouch! you hit me! ... but here is the input " + this.state.phone)
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
