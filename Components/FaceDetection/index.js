import React from 'react';
import { View, Text, Dimensions, ImageBackground, Animated, Easing} from 'react-native';
import {Button} from 'native-base'
import { Camera } from 'expo-camera';
import { Permissions, FaceDetector, DangerZone } from 'expo';
import { connect } from "react-redux";
import * as actionCreators from '../../store/actions'

import LottieView from "lottie-react-native";

import styles from './styles';



const { width: winWidth, height: winHeight } = Dimensions.get('window');

class CameraPage extends React.Component {

  static navigationOptions = {
    header:null
  };
    camera = null;

    static defaultProps = {
        countDownSeconds: 2,
        motionInterval: 500, //ms between each device motion reading
        motionTolerance: 1, //allowed variance in acceleration
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
      }
      
      state = {
        captures: [],
        motionInterval: 500, //ms between each device motion reading
        motionTolerance: 1, //allowed variance in acceleration
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
        hasCameraPermission: null,
        faceDetecting: false, //when true, we look for faces
        faceDetected: false, //when true, we've found a face
        countDownSeconds: 1, //current available seconds before photo is taken
        countDownStarted: false, //starts when face detected
        pictureTaken: false, //true when photo has been taken
        motion: null, //captures the device motion object 
        detectMotion: false, //when true we attempt to determine if device is still
        progress: new Animated.Value(0),
        progress2: new Animated.Value(0),
      };


    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });
    handleRecapture = () => this.setState({ captures: [] });
 


    countDownTimer = null;


    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        
      }
    
      componentDidMount(){

        this.startAnimation()
        this.startAnimation2()
        
        this.motionListener = DangerZone.DeviceMotion.addListener(this.onDeviceMotion);
        setTimeout(()=>{ //MH - tempm - wait 5 seconds for now before detecting motion
          this.detectMotion(true);
         
        },100);
  
      }

      startAnimation () {
        this.state.progress.setValue(0)
        Animated.timing(
          this.state.progress,
          {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
          }
        ).start(() => {
          this.startAnimation()
        })
      }

      startAnimation2 () {
        this.state.progress2.setValue(0)
        Animated.timing(
          this.state.progress2,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
          }
        ).start(() => {
          this.startAnimation2()
        })
      }

      componentWillUpdate(nextProps, nextState) {
        if (this.state.detectMotion && nextState.motion && this.state.motion){
          if (
            Math.abs(nextState.motion.x - this.state.motion.x) < this.props.motionTolerance
            && Math.abs(nextState.motion.y - this.state.motion.y) < this.props.motionTolerance
            && Math.abs(nextState.motion.z - this.state.motion.z) < this.props.motionTolerance
          ){
            //still
            this.detectFaces(true);
            this.detectMotion(false);
          } else {
            //moving
          }
        }
        
      }

      
  detectFaces(doDetect){
    this.setState({
      faceDetecting: doDetect,
    });
  }
  

  detectMotion =(doDetect)=> {
    this.setState({
      detectMotion: doDetect,
    });
    if (doDetect){
      DangerZone.DeviceMotion.setUpdateInterval(this.props.motionInterval);
    } else if (!doDetect && this.state.faceDetecting) {
      this.motionListener.remove();
    }
    
  }

  onDeviceMotion = (rotation)=>{
    this.setState({
      motion: rotation.accelerationIncludingGravity
    });
  }
    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        ratio="16:9"
                        type={cameraType}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                        onFacesDetected={this.state.faceDetecting ? this.handleFacesDetected : undefined }
                        onFaceDetectionError={this.handleFaceDetectionError}
                        faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Mode.none,
                        runClassifications: FaceDetector.Constants.Mode.none,
                        }}                        
                    />
                </View>
        
                <View >
                  {this.state.faceDetected?
                    <LottieView progress={this.state.progress} source={require('./assets/scanDone.json')}   height={winHeight} width={winWidth} />
                  : <LottieView  progress={this.state.progress2} source={require('./assets/scanFailed.json')}  loop height={winHeight} width={winWidth}/>
                }
                <View style={{width:winWidth, justifyContent:"center", alignItems:"center", top:winHeight/2}}>
                <Text style={{color:"white", fontWeight:"500", fontSize:20}}>{this.state.faceDetected ?  null: 'SHOW ME YOUR FACE!'}</Text>
                </View>
                </View>
         
                        
            </React.Fragment>
        );
    };
    handleFaceDetectionError = ()=>{
        //
      }
      handleFacesDetected = ({ faces }) => {
        if (faces.length === 1){
          this.setState({
            faceDetected: true,
          });
          if (!this.state.faceDetected && !this.state.countDownStarted){
            this.initCountDown();
          }
        } else {
          this.setState({faceDetected: false });
          this.cancelCountDown();
        }
      }
      initCountDown = ()=>{
        this.setState({ 
          countDownStarted: true,
        });
        this.countDownTimer = setInterval(this.handleCountDownTime, 1000);
      }
      cancelCountDown = ()=>{
        clearInterval(this.countDownTimer);
        this.setState({ 
          countDownSeconds: this.props.countDownSeconds,
          countDownStarted: false,
        });
      }
      handleCountDownTime = ()=>{
        if (this.state.countDownSeconds > 0){
          let newSeconds = this.state.countDownSeconds-1;
          this.setState({
            countDownSeconds: newSeconds,
          });
        } else {
          this.cancelCountDown();
          this.takePicture();
        }
      }
      takePicture = async ()=>{
        this.setState({
          pictureTaken: true,
        });
        if (this.camera) {
            const photoData = await this.camera.takePictureAsync({ base64: true }); ;
            this.setState({ captures: [photoData]})
            this.props.getFaceImagesList(1,photoData.base64)
            this.props.navigation.replace("Gallery", {captures:this.state.captures})
        }
      }
      onPictureSaved = ()=>{
        this.detectFaces(false);
      }
    
};


const mapDispatchToProps  = dispatch => {
  return {
    getFaceImagesList: (eventID, photo) => dispatch(actionCreators.getFaceImagesList(eventID, photo)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(CameraPage);
