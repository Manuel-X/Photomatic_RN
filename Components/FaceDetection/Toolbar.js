
import React from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {  TouchableOpacity, ImageBackground, View } from 'react-native';
import { withNavigation } from "react-navigation";
import styles from './styles';

import { Icon } from 'react-native-elements'


// export default ({ 
//     capturing = false, 
//     cameraType = CameraTypes.front, 
//     flashMode = CameraFlashModes.off, 
//     setFlashMode, setCameraType, 
//     onCaptureIn, onCaptureOut, onLongCapture, onShortCapture, captures
// }) => (

    class Toolbar extends React.Component {

        handlePress=()=> {
            this.props.navigation.replace("FaceDetection")

        }
        render() {
            return(


    
            <View style={styles.alignCenter}>
            <Icon
                size = {30}
                reverse
                name='camera'
                type='material'
                color='black'
                onPress={this.handlePress}
            />
            </View>

            

            )

            }
        }

        export default withNavigation(Toolbar);