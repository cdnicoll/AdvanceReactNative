import React from 'react';
import {
    View,
    Animated
} from 'react-native';

class Deck extends React.Component {
    /**
     * Loops through each data object and calls the renderCard method which
     * was passed in via props
     */
    renderCards() {
        return this.props.data.map(item => {
            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                { this.renderCards() }
            </View>
        )
    }
}

export default Deck;
