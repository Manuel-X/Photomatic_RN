import React, { Component } from "react";
import { connect } from "react-redux";
import { AppLoading } from 'expo';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'
import * as actionCreators from '../../store/actions'


const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

// NativeBase Components
import {
  Text,
  Button,

} from "native-base";


function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 2000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
class EventEntry extends Component {

componentDidMount(){
  this.props.resetValues()
}

  componentWillUnmount() {
    if (this.props.errors) {
      this.props.resetErrors();
    }
  }

  constructor() {
    super();

    this.buttonOpacity = new Value(1);


    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height*0.9 -90, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1,-1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0,100],
      extrapolate: Extrapolate.CLAMP
    });


    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1,0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180,360],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross2 = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [360,180],
      extrapolate: Extrapolate.CLAMP
    });

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./bg.jpg')]);

    await Promise.all([...imageAssets]);
  }
  state = {
    isReady:false,
    eventID:""
  };
  static navigationOptions = {
    header:null
  };
 
  handleChange = object => {
    this.setState(object);
  };
    
  handleSubmit = () => {
    // this.props.getEventDetail(2)
    this.props.navigation.navigate("FaceDetection")
    this.props.resetValues()
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    const { eventID } = this.state;
    return(
  <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >

        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
        <ImageBackground style={{position:'absolute',top:height, width:width, height:height*0.5, opacity:0.2}}  source={require('./bg.png')}></ImageBackground>


          <Svg height={height +50 } width={width}>
            <ClipPath id="clip">
              <Circle r={height+50} cx={width/2}>
              </Circle>
            </ClipPath>

          <Image
            href={require('./bg.jpg')}
            width={width}
            height={height+50}
            preserveAspectRatio='xMidYMid slice'
            clipPath='url(#clip)'
          />

          </Svg>
        </Animated.View>
        <View style={{  height: height / 2, justifyContent: 'center' }} >
        
          <TapGestureHandler onHandlerStateChange={this.onStateChange}   >
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
              
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>GET STARTED!</Text>
            </Animated.View>
          </TapGestureHandler>
          
          
          <Animated.View onPress={()=> this.setState({mode:"Signout"})} style = {{ opacity:0.1, zindex:this.textInputZindex,opacity:this.textInputOpacity,transform:[{translateY:this.textInputY}],height:height/3, ...StyleSheet.absoluteFill, top:null, justifyContent:'center'}}>
          
          <TapGestureHandler onHandlerStateChange={this.onCloseState}>
            <Animated.View style={styles.closeButton}>
              <Animated.Image source={require('./logo-wbg.png')} style={{width:width*0.8,height:height/14, transform:[{rotate:concat(this.rotateCross,'deg')}]}}>
              </Animated.Image>
              <Animated.Text style={{fontSize:26,fontWeight:"900",color:"navy", textAlign:"center", width:width*0.8,height:height/14, transform:[{rotate:concat(this.rotateCross2,'deg')}]}}> ONLY YOUR PHOTOS </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
            <TextInput
              placeholder="EVENT ID"
              style={styles.textInput}
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize="none" 
              name="eventID" 
              value={eventID}  
              onChangeText={eventID => this.handleChange({ eventID })}/> 
              <Animated.View >
              <Button style={styles.button1} onPress={this.handleSubmit}><Text style={{color:'white',fontSize:20, fontWeight:'bold'}}>SUBMIT</Text></Button>
              </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps  = dispatch => {
  return {
    //Real parameters names
    getEventDetail: (eventID) => dispatch(actionCreators.getEventDetail(eventID)),
    resetValues: () => dispatch(actionCreators.resetValues()),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(EventEntry);


const styles = StyleSheet.create({

  button: {
    backgroundColor: 'grey',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width:2,height:2 },
    shadowColor:'black', 
    shadowOpacity:0.7,
    top:100
  },
  button1: {
    backgroundColor: 'navy',
    height: 40,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width:2,height:2 },
    shadowColor:'black', 
    shadowOpacity:0.7,
    //bottom:150,
  },
  button2: {
    backgroundColor: '#dbd21d',
    height: 40,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width:2,height:2 },
    shadowColor:'black', 
    shadowOpacity:0.7
  },
  closeButton:{
    height:100, width:width,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top: -220,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft:10,
    marginVertical:5,
    borderColor:'rgba(0,0,0,0.2)',
    //bottom:150,
  }
});