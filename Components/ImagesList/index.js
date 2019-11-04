import React from 'react';
import { View, Dimensions, ScrollView, Text, ImageBackground, Platform } from 'react-native';
import { Permissions, MediaLibrary, FileSystem } from 'expo';


import LoadingDownload from './LoadingDownload'

import GradientButton from 'react-native-gradient-buttons'

import Image from 'react-native-scalable-image';

import FaceImageGrid from "./FaceImageGrid"
 
const { width: winWidth, height: winHeight } = Dimensions.get('window');

import * as actionCreators from '../../store/actions'

import { connect } from "react-redux";

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import LargeImage from './LargeImage'


 class ImagesList extends React.Component {

  state = {
    modalVisible:false,
}

  componentDidMount() {
    this.getCameraRollPermissions();
  }


  async saveToCache(image) {
   
      const extension = image.link.slice((image.link.lastIndexOf(".") - 1 >>> 0) + 2)
  
    await FileSystem.downloadAsync(
        image.link,
    `${FileSystem.cacheDirectory + image.title}.${ extension }`
    )
  }

  async getCameraRollPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ rollGranted: true });
    } else {
      console.log('Uh oh! The user has not granted us permission.');
      this.setState({ rollGranted: false });
    }
  }

  async saveImageToDevice(image){
    this.saveToCache(image)
    const asset = await MediaLibrary.createAssetAsync(`${FileSystem.cacheDirectory + image.title}.jpg`);
    if(Platform.OS === 'android')
    MediaLibrary.createAlbumAsync('Photomatic', asset)
  };

  saveAllPhotos = (images) => {
    this.setState({modalVisible:true})  

    setTimeout(()=>{ 
      this.setState({modalVisible:false}) 
     },1800);

    console.log("IMAGES!!!!!!!!!!!!!!!",images)
    images.forEach(image=>{
        this.saveImageToDevice(image)
    })

    setTimeout(()=>{ 
      if(!Platform.OS==='ios')
      alert("Photos Saved to your Images")
      else
      alert("Photos Saved to your Photomatic Album")
     },1900);

  }

  handleDownload = () => {
    if(this.props.selectedImages.length)
    this.saveAllPhotos(this.props.selectedImages)
    else alert("Select Photos you would like to download")
  }

  FaceImageElement = React.createRef();

  static navigationOptions = () => {

    state = {
      rollGranted: true,
    };

    return {
      title: "Photos you are featured in",
    };
  };

  imagesList = this.props.faceImagesList.map( (img,index) => (   
    <FaceImageGrid ref={this.FaceImageElement} image={img.link} i={index}/>
   ))
     render (){
        return(
          
            <View style={{marginBottom:50}} >
             
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
      onPressAction={this.handleDownload}
     >
     Download
     </GradientButton>
     <TouchableOpacity onPress={()=>this.props.navigation.replace("ListView")}>
     <ImageBackground source={{uri:"https://static.thenounproject.com/png/690222-200.png"}} style={{height:winHeight/15, width:winWidth/10}}></ImageBackground>
     </TouchableOpacity>
    </View>
    <Text style={{textAlign:"center",color:"white",fontWeight:"500",fontSize:20, width:winWidth,backgroundColor:"#90d4ed", height:winHeight/24}}> {this.props.selectedImages.length}/{this.props.faceImagesList.length} selected </Text>

  

                {this.props.loading?<Image source={{ uri:"https://i.ibb.co/nPPqsyF/ezgif-com-gif-maker-1.gif" }} style={styles.galleryImage} />:
                    <ScrollView>
                      <View style={{flex:1,flexDirection:"row", flexWrap:'wrap'}}>
                      {this.imagesList}
                      </View>
                    </ScrollView>
                }
                
                <View style={{width:winWidth,height:40, backgroundColor:"white"}}></View>
                <LoadingDownload modalVisible={this.state.modalVisible}/>
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