import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, Animated, Image} from 'react-native';
// import Image from 'react-native-scalable-image';
const { width: winWidth, height: winHeight } = Dimensions.get('window');
import { Icon } from 'react-native-elements'
import {PinchGestureHandler} from 'react-native-gesture-handler'

import * as actionCreators from '../../store/actions'

import { connect } from "react-redux";

import styles from './styles';


 class FaceImage extends Component {

  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this._pinchScale } }],
    { useNativeDriver: true }
  );

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  }; 


  render() {
    return (
    <View style={{marginBottom:20}}>
        <View>
        <PinchGestureHandler
        onGestureEvent={this._onPinchGestureEvent}
        onHandlerStateChange={this._onPinchHandlerStateChange}>
        <View style={styles.container} collapsable={false}>
        <Animated.Image source={{uri:this.props.image}} style={[{width:winWidth,  height:winHeight/2}, styles.pinchableImage,
              {
                transform: [
                  { perspective: 200 },
                  { scale: this._scale },
                ],
              },]}/>
        </View>
        </PinchGestureHandler>
        <View style={{width:winWidth,height:40, backgroundColor:"black",opacity:0.4, position:"absolute", bottom:0}}></View>
        <View style={styles.selectionButton}>
            {this.props.faceImagesList[this.props.i].selected?
            <TouchableOpacity onPress={()=> this.props.deselectImage(this.props.i)}>
            <Icon
                size = {40}
                name='check-circle'
                type='antidesign' 
                color="blue"     
            />
            </TouchableOpacity>:
            <TouchableOpacity onPress={()=> this.props.selectImage(this.props.i)}>
            <Icon
                size = {50}
                name='check'
                type='evilicon' 
                color="white" 
            />
            </TouchableOpacity>
            }
        </View>
        </View>

        
    </View>
    )
  }
}

const mapStateToProps  = state => {
    return {
      faceImagesList: state.faceImagesListReducer.faceImagesList ,
    };
  };

const mapDispatchToProps  = dispatch => {
    return {
      //Real parameters names
      selectImage: index => dispatch(actionCreators.selectImage(index)),
      deselectImage: index => dispatch(actionCreators.deselectImage(index)),
    };
  };

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(FaceImage);