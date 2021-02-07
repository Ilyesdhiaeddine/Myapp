import React, { Component } from 'react';
import PropTYpes from "prop-types";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

class RandomNumber extends Component {
    static PropTYpes = {
        number: PropTYpes.number.isRequired,
    };
    handlepress = () => {
        console.log(this.props.number);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlepress}>
                <Text style={styles.random}>{this.props.number}</Text>
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
    }
});
export default RandomNumber;