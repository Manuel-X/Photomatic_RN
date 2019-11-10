import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions, Animated, PanResponder, Button, TouchableWithoutFeedback, ImageBackground} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import { connect } from "react-redux";

import GestureRecognizer from 'react-native-swipe-gestures';

import * as actionCreators from '../../store/actions'



 class App extends React.Component {


  Users = this.props.unselectedImages
  

  static navigationOptions = {
    header:null
  };

  initialCount=0;
  mappingList= 0;

  
componentDidUpdate(){
  if(this.state.currentIndex === this.initialCount) {
   
    this.props.navigation.replace("ImagesList")
    setTimeout(()=>{ 
      this.setState({currentIndex:0})
     },500);

    
  }
}


position = new Animated.ValueXY()
   state = {
      currentIndex: 0,
      images_dimensions:[]
    }

   rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    }) 

    componentDidMount(){
 
    }
  
    
   componentWillMount() {
    this.mappingList = this.props.unselectedImages.map(img =>{
      return(
      img.id
      )
    })
  
     this.initialCount= this.props.unselectedImages.length

     this.Users.map( user=>  { 
      Image.getSize( user.link, ( width, height ) =>
      {
         const ratio = height/width 
 
          const joined = this.state.images_dimensions.concat(ratio);
          
        this.setState({
          images_dimensions:joined
        })

      }, ( error ) =>
      {
          this.setState({ loading: false });
          console.log( error );
      });
    })


    
    if(this.state.loading) () => {
        return(
          <View>

          </View>
        )
    }


   
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          this.props.selectImage(this.mappingList[this.state.currentIndex])
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          this.props.deselectImage(this.mappingList[this.state.currentIndex])
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers = () => {

    return this.Users.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

       

        return (
          <View>
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT-120, width: SCREEN_WIDTH, padding: 10, position: 'absolute', justifyContent:"center", alignItems:"center" }]}>
          
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: SCREEN_HEIGHT/2.5, left: 40, zIndex: 1000 }}>
              <Text style={{ backgroundColor:"white",borderWidth: 1, borderColor: 'blue', color: 'blue', fontSize: 32, fontWeight: '800', padding: 10 }}>CHOOSE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: SCREEN_HEIGHT/2.5, right: 40, zIndex: 1000 }}>
              <Text style={{ backgroundColor:"white",borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>SKIP</Text>

            </Animated.View>

            
            { this.state.images_dimensions.length> i?
            <Image source={{uri: item.link}} style={{width:SCREEN_WIDTH*0.95, height:SCREEN_WIDTH*0.95*this.state.images_dimensions[i], borderRadius:20 }}   />
            :null}


          </Animated.View>
          </View>
    
        )
      }
      else {
        return (
              
          <Animated.View
            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT-120 , width: SCREEN_WIDTH, padding: 10, position: 'absolute', justifyContent:"center", alignItems:"center"
            }]}>
           
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: SCREEN_HEIGHT/2.5, left: 40, zIndex: 1000 }}>
            <Text style={{ backgroundColor:"white",borderWidth: 1, borderColor: 'blue', color: 'blue', fontSize: 32, fontWeight: '800', padding: 10 }}>CHOOSE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: SCREEN_HEIGHT/2.5, right: 40, zIndex: 1000 }}>
            <Text style={{ backgroundColor:"white",borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>SKIP</Text>

            </Animated.View>
            { this.state.images_dimensions.length > i?
            <Image source={{uri: item.link}} style={{width:SCREEN_WIDTH*0.95, height:SCREEN_WIDTH*this.state.images_dimensions[i]*0.95, borderRadius:20 }}  />
            :null}
          </Animated.View>
     
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60, width:100}}>
   
        <TouchableWithoutFeedback onPress={() => this.props.navigation.replace("ImagesList")}>
          <View style={{width:SCREEN_WIDTH, justifyContent:"center", alignItems:"center"}}>
          <View style={{padding:20, borderColor:"blue", borderRadius:10, borderWidth:1, width:SCREEN_WIDTH*0.5, justifyContent:"center", alignContent:"center", bottom:10, }}>
        <Text  style={{color:"blue", fontWeight:"600", fontSize:16, textAlign:"center"}}> SEE ALL PHOTOS</Text>
        </View>
        </View>
        </TouchableWithoutFeedback>
        
        </View>


      </View>

    );
  }
}

const mapStateToProps  = state => {
  return {
    unselectedImages: state.faceImagesListReducer.unselectedImages ,
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    //Real parameters names
    selectImage: index => dispatch(actionCreators.selectImageDeck(index)),
    deselectImage: index => dispatch(actionCreators.deselectImageDeck(index)),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});