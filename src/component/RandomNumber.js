import React, { Component } from 'react';
import PropTYpes from "prop-types";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

class RandomNumber extends Component {
    static PropTYpes = {
        id: PropTYpes.number.isRequired,
        number: PropTYpes.number.isRequired,
        isDisabled: PropTYpes.bool.isRequired,
        onPress: PropTYpes.func.isRequired,
    };
    handlepress = () => {
        this.props.onPress(this.props.id);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlepress}>
                <Text style={[styles.random, this.props.isDisabled && styles.selected]}>
                    {this.props.number}
                </Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({

    random: {
        backgroundColor: '#aaa',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        textAlign: 'center',
        fontSize: 35,

    },
    selected: {
        opacity: 0.3,
    }
});
export default RandomNumber;