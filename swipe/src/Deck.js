import React from 'react';
import {
    View,
    Animated,
    PanResponder
} from 'react-native';

class Deck extends React.Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: () => {}
        });

        this.state = {
            panResponder,
            position
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
            <Animated.View
                style={this.state.position.getLayout()}
                {...this.state.panResponder.panHandlers}
            >
                { this.renderCards() }
            </Animated.View>
        )
    }
}

export default Deck;
