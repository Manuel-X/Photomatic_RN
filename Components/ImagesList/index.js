import React from 'react';
import { View, Dimensions, ScrollView, Text, ImageBackground, Platform, Vibration, Image} from 'react-native';
import { Permissions, MediaLibrary, FileSystem } from 'expo';

import LottieView from "lottie-react-native";


import LoadingDownload from './LoadingDownload'

import GradientButton from 'react-native-gradient-buttons'

//import Image from 'react-native-scalable-image';

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
    console.log("RECEIVED IMAGES", this.props.faceImagesList)
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
    const asset = await MediaLibrary.createAssetAsync(`${FileSystem.cacheDirectory + image.title}.jpeg`);
    if(Platform.OS === 'android')
    MediaLibrary.createAlbumAsync('Photomatic', asset)
  };

  saveAllPhotos = (images) => {
    this.setState({modalVisible:true})  

    setTimeout(()=>{ 
      this.setState({modalVisible:false}) 
     },1800);

 
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
      title: "Your Photos",
    };
  };
  imagesList = this.props.faceImagesList.map( (img,index) => (   
    <FaceImageGrid image={img.link} i={index}/>
   ))
     render (){
      if(!this.props.faceImagesList.length){
      return (
        <Image source={require('./assets/facescan.gif')} style={{height:winHeight, width:winWidth}} />
      )
      }else{
        return(
    <View style={{marginBottom:50,}} >
     <View style={{flexDirection:"row"}}>
     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
     {this.props.selectedImages.length == this.props.faceImagesList.length?
      <ImageBackground source={require('./assets/deactive-carousel.png')} style={{height:winHeight*0.03, width:winHeight*0.034, top:5, marginBottom:10}}></ImageBackground>:
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DeckView")}>
      <ImageBackground source={require('./assets/carousel.png')} style={{height:winHeight*0.03, width:winHeight*0.034, top:5, marginBottom:10}}></ImageBackground>
      </TouchableOpacity>
      }
    
    </View>
{this.props.selectedImages.length?
  <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
  <TouchableOpacity onPress={this.handleDownload}>
  <ImageBackground source={require('./assets/download.png')} style={{height:winHeight*0.03, width:winHeight*0.045, top:5, marginBottom:10}}></ImageBackground>
  </TouchableOpacity>
</View>:
<View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
  <ImageBackground source={require('./assets/deactive-download.png')} style={{height:winHeight*0.03, width:winHeight*0.045, top:5, marginBottom:10}}></ImageBackground>
</View>
}

     </View>

  
     {/* <TouchableOpacity onPress={()=>this.props.navigation.replace("DeckView")}>
     <ImageBackground source={{uri:"https://static.thenounproject.com/png/690222-200.png"}} style={{height:winHeight/15, width:winWidth/10}}></ImageBackground>
     </TouchableOpacity> */}
    
    {this.props.selectedImages.length? 
    <View style={{flexDirection:"row",marginBottom:10 ,marginTop:10}}>

    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontWeight:"700", fontSize:12, textAlignVertical:"center", marginRight:10}}> {this.props.selectedImages.length}/{this.props.faceImagesList.length} SELECTED</Text>
     </View>
   
   <TouchableOpacity onPress={()=> this.props.selectAllImages()}>
    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontWeight:"700", fontSize:12, textAlignVertical:"center", marginRight:10}}>SELECT ALL</Text>
     </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=> this.props.deSelectAllImages()}>
     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Text style={{fontWeight:"700", fontSize:12, textAlignVertical:"center", marginRight:10}}>DESELECT ALL</Text>
     </View>
  </TouchableOpacity>
     </View>
     :null}       
                    <ScrollView>
                      <View style={{flex:1,flexDirection:"row", flexWrap:'wrap'}}>
                      {this.props.faceImagesList.map( (img,index) => (   
    <FaceImageGrid image={img.link} i={index}/>
   ))}
                      </View>
                    </ScrollView>
                
                
                <View style={{width:winWidth,height:40, backgroundColor:"white"}}></View>
                <LoadingDownload modalVisible={this.state.modalVisible}/>
            </View>
        
        )
    }
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