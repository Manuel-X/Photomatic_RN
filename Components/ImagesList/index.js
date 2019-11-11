import React from 'react';
import { View, Dimensions, ScrollView, Text, ImageBackground, Platform, Vibration, Image, Animated,  NativeModules,
  LayoutAnimation} from 'react-native';
import { Permissions, MediaLibrary, FileSystem } from 'expo';

import LottieView from "lottie-react-native";


import LoadingDownload from './LoadingDownload'

import GradientButton from 'react-native-gradient-buttons'

//import Image from 'react-native-scalable-image';

import FaceImageGrid from "./FaceImageGrid"
 
const { UIManager } = NativeModules;

const { width: winWidth, height: winHeight } = Dimensions.get('window');

import * as actionCreators from '../../store/actions'

import { connect } from "react-redux";

import styles from './styles';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import LargeImage from './LargeImage'


 class ImagesList extends React.Component {

 

  scrollYAnimatedValue= new Animated.Value(0)

  state = {
    modalVisible:false,
}

  componentDidMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring();
    this.getCameraRollPermissions();
    console.log("RECEIVED IMAGES", this.props.faceImagesList)
  }

  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true});
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
    MediaLibrary.createAlbumAsync('Fotomatic', asset)
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
      alert("Photos Saved to your Fotomatic Album")
     },1900);

  }

  handleDownload = () => {
    if(this.props.selectedImages.length)
    this.saveAllPhotos(this.props.selectedImages)
    else alert("Select Photos you would like to download")
  }

  headerHeight= 150;
  FaceImageElement = React.createRef();

  static navigationOptions = {
    header:null
  };
  
  imagesList = this.props.faceImagesList.map( (img,index) => (   
    <FaceImageGrid image={img.link} i={index}/>
   ))
     render (){


     
    
        

        
        const secondBar = this.scrollYAnimatedValue.interpolate(
              {
              inputRange: [(1122*0.08)+350,(1122*0.13)+350],
              outputRange: [0, 1122*0.05],
              extrapolate:"clamp",
              useNativeDriver: true,
              })


              const iconOpacity = this.scrollYAnimatedValue.interpolate(
                {
                inputRange: [(1122*0.08)+350,(1122*0.13)+350],
                outputRange: [0, 1],
                extrapolate:"clamp",
                useNativeDriver: true,
                })

                const secondBarMargin = this.scrollYAnimatedValue.interpolate(
                  {
                  inputRange: [(1122*0.08)+150,(1122*0.13)+150],
                  outputRange: [0, 30],
                  extrapolate:"clamp",
                  useNativeDriver: true,
                  })
              

                

    
        
   

      if(!this.props.faceImagesList.length){
      return (
        <Image source={require('./assets/facescan.gif')} style={{height:1122, width:winWidth}} />
      )
      }else{
        return(
    <View>
     <Animated.View style={{flexDirection:"row", height:secondBar, backgroundColor:"white", marginTop:secondBarMargin}}>

     {this.props.selectedImages.length? 
     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center",}}>
      <TouchableOpacity onPress={()=> this.props.selectAllImages()}>
      <Animated.Image source={require('./assets/selectall.png')} style={{height:1122*0.03, width:1122*0.03,}}/>
      </TouchableOpacity>
    </View>:
    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
      <TouchableOpacity  onPress={this.goToTop}>
      <Animated.Image source={require('./assets/logo.png')} style={{height:1122*0.03, width:1122*0.03}}/>
      </TouchableOpacity>
    </View>
    }

    {this.props.selectedImages.length? 
    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
      <TouchableOpacity onPress={()=> this.props.deSelectAllImages()}>
      <Animated.Image source={require('./assets/unselect.png')} style={{height:1122*0.03, width:1122*0.03}}/>
      </TouchableOpacity>
    </View>:
    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
      <TouchableOpacity onPress={this.goToTop}>
      <Animated.Image source={require('./assets/logo-text.png')} style={{height:1122*0.03*0.75, width:1122*0.115928238*0.75}}/>
      </TouchableOpacity>
    </View>
    }

     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
     {this.props.selectedImages.length == this.props.faceImagesList.length?
      <Animated.Image source={require('./assets/deactive-carousel.png')} style={{height:1122*0.03, width:1122*0.034,  opacity:iconOpacity}}/>:
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DeckView")}>
      <Animated.Image source={require('./assets/carousel.png')} style={{height:1122*0.03, width:1122*0.034}}/>
      </TouchableOpacity>
      }
    </View>
{this.props.selectedImages.length?
  <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
  <TouchableOpacity onPress={this.handleDownload}>
  <Animated.Image source={require('./assets/download.png')} style={{height:1122*0.03, width:1122*0.045}}/>
  </TouchableOpacity>
</View>:
<View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/4, alignItems:"center", justifyContent:"center"}}>
  <Animated.Image source={require('./assets/deactive-download.png')} style={{height:1122*0.03, width:1122*0.045, opacity:iconOpacity}}/>
</View>
}
     </Animated.View>

                    <ScrollView
              
                    ref={(c) => {this.scroll = c}}
                    scrollEventThrottle={16}
                    onScroll= {Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                    )}
                     
                    >

                    {console.log("HEIGHT!!!!!!!!!!!!!!!!!!!!",winHeight)}
                    <ImageBackground source={{uri:"https://catering-kvatric.hr/wp-content/uploads/2017/04/best-party-planner.jpg"}} style={{width:winWidth, height:350}} imageStyle= {{opacity:0.4}}>
                    <Animated.View style={{height:150, top:30}}>
                    <View style={{flexDirection:"row"}}>
                      <View>
                    <Image source={{uri:"https://catering-kvatric.hr/wp-content/uploads/2017/04/best-party-planner.jpg"}} style={{height:112, width:112, borderColor:"white", borderRadius:60, borderWidth:1, left:15, top:10}}></Image>
                    <View style={{width:112, left:15, top:10}}>
                    <Text style={{textAlign:"center"}} >Manuel Maged</Text>
                    </View>
                    </View>
                   <View style={{left:30,top:20}}>
                   <Text style={{ fontSize:26, color:"navy", fontWeight:"900"}}> EVENT NAME </Text>
                   <Text style={{ left:5,width:winWidth-180,fontSize:19, color:"black", fontWeight:"400"}}>This is the description of the event. you can write whatever you want here. </Text>
                   </View>
                  </View>

                  <View style={{width:winWidth, top:40, marginBottom:40}}>
                      <Text style={{color:"navy",textAlign:"center", fontSize:18, fontWeight:"700"}}>EVENT REF: FG1920194446</Text>
                    </View>

                  <View style={{top:40, left:16, flexDirection:"row"}}>
                   
                    <View style={{width:(winWidth/5)}}>
                      <Text style={{textAlign:"center", color:"navy", fontSize:18, fontWeight:"700"}}>DATE</Text>
                      <Text style={{textAlign:"center", color:"black", fontSize:14, fontWeight:"400"}}> 02-02-2019</Text>
                    </View>
                    <View style={{width:(winWidth/5)}}>
                      <Text style={{textAlign:"center", color:"navy", fontSize:18, fontWeight:"700"}}>TIME</Text>
                      <Text style={{textAlign:"center", color:"black", fontSize:14, fontWeight:"400"}}> 7:45 PM</Text>
                    </View>
                    <View style={{width:(winWidth/4)}}>
                      <Text style={{textAlign:"center", color:"navy", fontSize:18, fontWeight:"700"}}>LOCATION</Text>
                      <Text style={{textAlign:"center", color:"black", fontSize:14, fontWeight:"400"}}>Free Trade Zone in Shuwaikh</Text>
                    </View>
                    <View style={{width:(winWidth/4)}}>
                      <Text style={{textAlign:"center", color:"navy", fontSize:18, fontWeight:"700"}}>ATTENDEES</Text>
                      <Text style={{textAlign:"center", color:"black", fontSize:14, fontWeight:"400"}}>300</Text>
                    </View>
                  </View>

                   </Animated.View>
                   </ImageBackground>

                         
     <Animated.View style={{flexDirection:"row", height:1122*0.05, backgroundColor:"white",}}>
     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
     {this.props.selectedImages.length == this.props.faceImagesList.length?
      <Animated.Image source={require('./assets/deactive-carousel.png')} style={{height:1122*0.03, width:1122*0.034}}/>:
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DeckView")}>
      <Animated.Image source={require('./assets/carousel.png')} style={{height:1122*0.03, width:1122*0.034}}/>
      </TouchableOpacity>
      }
    </View>
{this.props.selectedImages.length?
  <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
  <TouchableOpacity onPress={this.handleDownload}>
  <Animated.Image source={require('./assets/download.png')} style={{height:1122*0.03, width:1122*0.045}}/>
  </TouchableOpacity>
</View>:
<View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/2, alignItems:"center", justifyContent:"center"}}>
  <Animated.Image source={require('./assets/deactive-download.png')} style={{height:1122*0.03, width:1122*0.045}}/>
</View>
}
     </Animated.View>

  
     {/* <TouchableOpacity onPress={()=>this.props.navigation.replace("DeckView")}>
     <ImageBackground source={{uri:"https://static.thenounproject.com/png/690222-200.png"}} style={{height:1122/15, width:winWidth/10}}></ImageBackground>
     </TouchableOpacity> */}
    
    
    {this.props.selectedImages.length? 
    <Animated.View style={{flexDirection:"row", height:1122*0.03}}>

    <TouchableWithoutFeedback>
    <View style={{borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Animated.Text style={{   fontWeight:"700", fontSize:12, marginRight:10 }}> {this.props.selectedImages.length}/{this.props.faceImagesList.length} SELECTED</Animated.Text>
     </View>
     </TouchableWithoutFeedback>
   
   <TouchableOpacity onPress={()=> this.props.selectAllImages()}>
    <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Animated.Text style={{fontWeight:"700", fontSize:12, marginRight:10}}>SELECT ALL</Animated.Text>
     </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=> this.props.deSelectAllImages()}>
     <View style={{ borderColor:"white", borderWidth:0.3, flexDirection:"row", width:winWidth/3, alignItems:"center", justifyContent:"center"}}>
      <Animated.Text style={{fontWeight:"700", fontSize:12, marginRight:10}}>DESELECT ALL</Animated.Text>
     </View>
  </TouchableOpacity>
     </Animated.View>
     :null}  

                      <View style={{flex:1,flexDirection:"row", flexWrap:'wrap', marginBottom:100}}>
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