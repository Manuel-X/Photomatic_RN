import React from 'react';
import { View, Dimensions, ScrollView, Text, ImageBackground} from 'react-native';

import Button from 'react-native-button';

import GradientButton from 'react-native-gradient-buttons'

import Image from 'react-native-scalable-image';

import FaceImage from "./FaceImage"
 
const { width: winWidth, height: winHeight } = Dimensions.get('window');

import * as actionCreators from '../../store/actions'

import { connect } from "react-redux";

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



 class ImagesList extends React.Component {  
   
  FaceImageElement = React.createRef();

  static navigationOptions = () => {
    return {
      title: "Photos you are featured in",
    };
  };
  imagesList = this.props.faceImagesList.map( (img,index) => (   
    <FaceImage ref={this.FaceImageElement} image={img.image} i={index}/>
   ))
     render (){
        return(
            <View style={{marginBottom:100}} >
            <View style={{color:"white", width:winWidth,backgroundColor:"#90d4ed", height:winHeight/13, position:"absolute", top:0}}></View>
      <View style={{flexDirection:"row"}}>
      <GradientButton
      style={{ marginVertical: 2, fontWeight:"300" }}
      text="Select"
          
      gradientBegin="#2c9948"
      gradientEnd="#2a2f91"
      gradientDirection="diagonal"
      height={winHeight/15}
      width={winWidth*0.20}
      radius={15}
      onPressAction={() => this.props.selectAllImages()}
    />
    <GradientButton
      style={{ marginVertical: 2 }}
      gradientBegin="#d6111e"
      gradientEnd="#c227b5"
      gradientDirection="diagonal"
      height={winHeight/15}
      width={winWidth*0.26}
      radius={15}
      onPressAction={() => this.props.deSelectAllImages()}
     >
     Deselect

     </GradientButton>
     <GradientButton
      style={{ marginVertical: 2 }}
           
      gradientBegin={this.props.selectedImages.length?"green":"grey"}
      gradientEnd={this.props.selectedImages.length?"black":"lightgrey"}
      gradientDirection="diagonal"
      height={winHeight/15}
      width={winWidth*0.30}
      radius={15}

     >
     Download
     </GradientButton>
     <TouchableOpacity onPress={()=>this.props.navigation.replace("ImagesList")}>
     <ImageBackground source={{uri:"https://image.flaticon.com/icons/png/128/25/25617.png"}} style={{height:winHeight/15, width:winWidth/10}}></ImageBackground>
     </TouchableOpacity>
    </View>
    <Text style={{textAlign:"center",color:"white",fontWeight:"500",fontSize:20, width:winWidth,backgroundColor:"#90d4ed", height:winHeight/24}}> {this.props.selectedImages.length}/{this.props.faceImagesList.length} selected</Text>

                {this.props.loading?<Image source={{ uri:"https://i.ibb.co/nPPqsyF/ezgif-com-gif-maker-1.gif" }} style={styles.galleryImage} />:
                    <ScrollView>
                      {this.imagesList}
                    </ScrollView>
                }
                <View style={{width:winWidth,height:40, backgroundColor:"white"}}></View>
               
            </View>
        
        )
     }
 }

 const mapStateToProps  = state => {
    return {
      faceImagesList: state.faceImagesListReducer.faceImagesList ,
      selectedImages: state.faceImagesListReducer.selectedImages,
      loading: state.faceImagesListReducer.loading
    };
  };

  const mapDispatchToProps  = dispatch => {
    return {
      //Real parameters names
      selectAllImages: () => dispatch(actionCreators.selectAllImages()),
      deSelectAllImages: () => dispatch(actionCreators.deSelectAllImages()),
    };
  };
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ImagesList);