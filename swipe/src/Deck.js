import React from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; // 1/4 of the screen
const SWIPE_OUT_DURATION = 250;

class Deck extends React.Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                // dx & dy are the users current touch location,
                // for now only using dx as I don't want Y movement
                position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = {
            panResponder,
            position,
            index: 0
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
     * Resets a card to its original state
     */
    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    /**
     * Force swipes a card left or right if it's position is far enough over.
     *
     * @param {String} direction
     */
    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    /**
     * Once the swipe is completed, we call the callback passed in via props
     *
     * @param {String} direction
     */
    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        // NOTE: data is defined on the above line
        const item = data[this.state.index]
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
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
