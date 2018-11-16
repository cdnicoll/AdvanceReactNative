import React from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

class Deck extends React.Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                // dx & dy are the users current touch location
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: () => {}
        });

        this.state = {
            panResponder,
            position
        }
    }

    getCardStyle() {
        const { position } = this.state; // NOTE: Same as writing const position = this.state.position
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
            outputRange: ['-45deg', '0deg', '45deg']
        })
        return {
            ...position.getLayout(), // spread operator (...) take all the different properites and add all the properties to the return
            transform:[{ rotate }]
        };
    }

    /**
     * Loops through each data object and calls the renderCard method which
     * was passed in via props
     */
    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        { this.props.renderCard(item) }
                    </Animated.View>
                );
            }
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
