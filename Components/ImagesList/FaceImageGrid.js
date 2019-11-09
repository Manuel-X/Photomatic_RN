import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { withNavigation } from "react-navigation";

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
    if(this.props.selectedImages.length)
    this.setState({modalVisible:true}) 
    else  
    this.props.selectImage(this.props.i)
}


handleShortPress = () => {
  if(this.props.selectedImages.length){
    if(this.props.faceImagesList[this.props.i].selected)
  this.props.deselectImage(this.props.i)
    else
  this.props.selectImage(this.props.i)
  }else{
 this.props.navigation.navigate("GalleryView", {imageIndex:this.props.i, num:this.props.faceImagesList.length})
  }
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
        <TouchableOpacity onPress={this.handleShortPress} onLongPress={this.handlePress} onPressOut={this.handlePressOut} >
        <ImageBackground source={{uri:this.props.image}} blurRadius={this.props.blurValue} style={{ height:winWidth*0.3, width:winWidth*0.32}}/>
        </TouchableOpacity>

        <View style={styles.selectionButton}>
            {this.props.faceImagesList[this.props.i].selected?
            <TouchableOpacity onPress={()=> this.props.deselectImage(this.props.i)}>

            <ImageBackground source={require('./assets/check.png')} style={{height:winHeight*0.028, width:winHeight*0.028, marginRight:5, marginBottom:5}}></ImageBackground>
            </TouchableOpacity>:null
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
      blurValue: state.faceImagesListReducer.blurValue,
      selectedImages: state.faceImagesListReducer.selectedImages,
    };
  };

const mapDispatchToProps  = dispatch => {
    return {
      //Real parameters names
      selectImage: index => dispatch(actionCreators.selectImage(index)),
      deselectImage: index => dispatch(actionCreators.deselectImage(index)),
    };
  };

  export default withNavigation( connect(
    mapStateToProps, mapDispatchToProps
  )(FaceImageGrid));


