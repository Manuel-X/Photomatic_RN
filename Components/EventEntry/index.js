import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {Button, TextInput, StyleSheet} from "react-native"
import actionCreators from '../../store/actions'

import { connect } from "react-redux";

 class EventEntry extends Component {
     state = {
         eventID:""
     }
     handleChange = object => {
        this.setState(object);
      };

    handleSubmit = () => {
        this.props.navigation.navigate("FaceDetection")
    }
  render() {
    return (
        <View>
        <View style={{flexDirection:"row"}}>
            <Text style={{textAlignVertical:"center"}}>EVENT ID: </Text>
        <TextInput
              placeholder="EVENT ID"
              style={styles.textInput}
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize="none" 
              name="eventID"
              onChangeText = {eventID => this.handleChange({ eventID })}> 
        </TextInput>
        </View>
        <Button title="SUBMIT" onPress={this.handleSubmit}></Button>
        </View>
   )
  }
}


const mapDispatchToProps  = dispatch => {
  return {
    //Real parameters names
    getEventDetail: (eventID) => dispatch(actionCreators.getEventDetail(eventID)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EventEntry);


const styles = StyleSheet.create({
    textInput: {
    width:300,
      height: 50,
      borderRadius: 25,
      borderWidth: 0.5,
      marginHorizontal: 20,
      paddingLeft:10,
      marginVertical:5,
      borderColor:'rgba(0,0,0,0.2)'
    }
  });