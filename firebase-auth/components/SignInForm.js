import React from 'react'
import {
    View
} from 'react-native'
import {
    FormLabel,
    FormInput,
    Button
} from 'react-native-elements'
import axios from 'axios'

class SignInForm extends React.Component {
    state = {
        phone: '',
        code: ''
    }

    render() {
        return (
            <View>
                <View>
                    <FormLabel>Phone</FormLabel>
                    <FormInput onChangeText={ phone => this.setState({ phone }) } />
                </View>
                <View>
                    <FormLabel>Code</FormLabel>
                    <FormInput onChangeText={ code => this.setState({ code }) } />
                </View>
                <Button title="Submit" />
            </View>
        )
    }
}
