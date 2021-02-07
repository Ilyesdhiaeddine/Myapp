import React, { Component } from 'react';
import PropTYpes from "prop-types";

import { Text, View, StyleSheet } from "react-native";

import RandomNumber from "./RandomNumber";

class Game extends Component {
    static PropTYpes = {
        randomNumberCount: PropTYpes.number.isRequired,
    };
    state = {
        selectedNumbers: [],
    };


    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumbers: [...prevState.selectedNumbers, numberIndex],
        }));

    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomnumber, index) =>
                        <RandomNumber
                            key={index}
                            number={randomnumber}
                            isDisabled={this.isNumberSelected(index)}
                            onPess={this.selectNumber}
                        />
                    )}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ddd",
        flex: 1,
        paddingTop: 30,
    },
    target: {
        fontSize: 50,
        backgroundColor: "#bbb",
        textAlign: 'center',
        margin: 50,
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    random: {
        backgroundColor: '#aaa',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        textAlign: 'center',
        fontSize: 35,
    }
});

export default Game;