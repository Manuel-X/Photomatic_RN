import React, { Component } from 'react'
import {View, Dimensions, Modal, ImageBackground} from 'react-native'
import Image from 'react-native-scalable-image';
const { width: winWidth, height: winHeight } = Dimensions.get('window');



 class LargeImage extends Component {

  render() {
    return (
       
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.modalVisible}>
          <ImageBackground  blurRadius={100}  style={{height:winHeight, width:winWidth, opacity:0.9 }} source={{uri: "https://mightyrasing.com/wp-content/uploads/2017/02/dark-grey-background-1600-1050-plain.jpg"}}>
          <View style={{height:winHeight, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            </View>
            </ImageBackground>
          
            <View style={{left:winWidth*0.05, position:"absolute", height:winHeight, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{height:30, backgroundColor:"white", width:winWidth*0.9, borderTopLeftRadius:20, borderTopRightRadius:20}}></View>
            <Image width={winWidth*0.9} source={{uri: this.props.image}}></Image>
            <View style={{height:30, backgroundColor:"white", width:winWidth*0.9, borderBottomLeftRadius:20, borderBottom4RightRadius:20}}></View>
            </View>
        </Modal>
     
    )
  }
}

export default LargeImage;