import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
import { Icon } from 'react-native-elements'

import * as actionCreators from '../../store/actions'

import { connect } from "react-redux";

import styles from './styles';

import LargeImage from './LargeImage'




 class FaceImageGrid extends Component {
  state = {
    modalVisible:false,
}


  handlePress = () => {
    this.setState({modalVisible:true})   
}

handlePressOut = () => {
  this.setState({modalVisible:false})   
}

handleSelectChoice = () => {
  if(this.props.faceImagesList[this.props.i].selected) this.props.deselectImage(this.props.i)
  else this.props.selectImage(this.props.i)
}

  render() {


    return (
   
    <View style={{marginLeft:winWidth*0.01, marginBottom:winWidth*0.01}}>
        <View>
        <TouchableOpacity onPress={this.handleSelectChoice} onLongPress={this.handlePress} onPressOut={this.handlePressOut} >
        <ImageBackground source={{uri:this.props.image}} blurRadius={this.props.blurValue} style={{ height:winWidth*0.3, width:winWidth*0.32}}/>
        </TouchableOpacity>
        <View style={{width:winWidth*0.32,height:30, backgroundColor:"black",opacity:0.4, position:"absolute", bottom:0}}></View>
        <View style={styles.selectionButton}>
            {this.props.faceImagesList[this.props.i].selected?
            <TouchableOpacity onPress={()=> this.props.deselectImage(this.props.i)}>
            <Icon
                size = {30}
                name='check-circle'
                type='antidesign' 
                color="blue"     
            />
            </TouchableOpacity>:
            <TouchableOpacity onPress={()=> this.props.selectImage(this.props.i)}>
            <Icon
                size = {37.5}
                name='check'
                type='evilicon' 
                color="white" 
            />
            </TouchableOpacity>
            }
            
        </View>
        </View>
        <LargeImage image={this.props.image} modalVisible={this.state.modalVisible}/>
        
    </View>
    )
  }
}

const mapStateToProps  = state => {
    return {
      faceImagesList: state.faceImagesListReducer.faceImagesList ,
      blurValue: state.faceImagesListReducer.blurValue 
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
  )(FaceImageGrid);