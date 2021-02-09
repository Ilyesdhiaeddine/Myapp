import React, { Component } from 'react';
import PropTYpes from 'prop-types';

import { Text, View, StyleSheet } from "react-native";

import RandomNumber from "./RandomNumber";

class Game extends Component {
    static PropTYpes = {
        randomNumberCount: PropTYpes.number.isRequired,
        initialSeconds: PropTYpes.number.isRequired,
    };
    state = {
        selectedIds: [],
        remaningSeconds: this.props.initialSeconds,
    };
    gameStatus = 'PLAYING';

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()))

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remaningSeconds: prevState.remaningSeconds - 1 }
            }, () => {
                if (this.state.remaningSeconds === 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    }
    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedIds !== this.state.selectedIds ||
            nextState.remaningSeconds === 0
        ) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId)
            }
        }
    }

    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (nextState.remaningSeconds === 0) {
            return ('LOST')
        }
        if (sumSelected < this.target) {
            return ('PLAYING');
        }
        if (sumSelected === this.target) {
            return ('WON');
        }
        return ('LOST');
    };

    render() {
        const gameStatus = this.gameStatus;
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                    {this.randomNumbers.map((randomnumber, index) =>
                        <RandomNumber
                            key={index}
                            id={index}
                            number={randomnumber}
                            isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
                <Text>{this.state.remaningSeconds} </Text>
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
    },
    STATUS_PLAYING: {
        backgroundColor: "#bbb",
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    }
});

export default Game;