import React from 'react';
import {
    View,
    Animated,
    PanResponder
} from 'react-native';

class Deck extends React.Component {
    constructor(props) {
        super(props);

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {

            },
            onPanResponderRelease: () => {}
        });

        this.state = {
            panResponder
        }
    }
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
            <View {...this.state.panResponder.panHandlers}>
                { this.renderCards() }
            </View>
        )
    }
}

export default Deck;
