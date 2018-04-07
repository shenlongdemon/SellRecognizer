import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';
const {
    Circle,
    Rect,
    Line
} = Svg;


//"___-0123456789abcdefghijklmnopqrstuvwxyz"
export default class OMCode extends React.Component {
    static str = "___-0123456789abcdefghijklmnopqrstuvwxyz";
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.text}</Text>
                <Svg height="100" width="100">
                    <Circle
                        cx="50"
                        cy="50"
                        r="50"
                        stroke="blue"
                        strokeWidth="2.5"
                        fill="white"
                    />
                </Svg>


                {Array.from(this.props.text).map((c, i) => {
                    let x_1 = 0;
                    let y_1 = 0;
                    let x_2 = 0;
                    let y_2 = 0;
                    return (
                        <Line
                            x1={x_1}
                            y1={y_1}
                            x2={x_2}
                            y2={y_2}
                            stroke="red"
                            strokeWidth="2"
                        />
                    );
                })}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
