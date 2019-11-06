import React from 'react';
import { View, Image, TouchableOpacity, ImageBackground, Text, Dimensions } from 'react-native';

import styles from './styles';

import Toolbar from './Toolbar';

const { width: winWidth, height: winHeight } = Dimensions.get('window');


class Gallery extends React.Component {
    state={
        buttonVisible:false
    }


    componentDidMount(){
        
        setTimeout(()=>{ 
           this.props.navigation.replace("DeckView");
           this.setState({buttonVisible:true})
          },2000);
        
    }

    render(){
        const captures= this.props.navigation.getParam("captures")
        return(
    <View>
       
        {captures.map(({ uri }) => (
            <View key={uri}>
                {/* <Image source={{ uri:"https://i.ibb.co/nPPqsyF/ezgif-com-gif-maker-1.gif" }} style={styles.galleryImage} /> */}
                <Image source={{ uri: uri }} style={styles.galleryImage} />
            </View>
        ))}
        <View style={{bottom:winHeight/4}} >
          <Text style={{textAlign:"center", color:"white", fontWeight:"500", backgroundColor:"black", padding:10, borderRadius:10, width:winWidth}}> PREVIEW </Text>
        </View>
        
    </View>
        )
    }

        }
export default Gallery