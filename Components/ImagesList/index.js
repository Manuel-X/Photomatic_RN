import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';


 class ImagesList extends React.Component {
     render (){
        return(
            <View >
               <Image source={{ uri:"https://i.ibb.co/nPPqsyF/ezgif-com-gif-maker-1.gif" }} style={styles.galleryImage} />
            </View>
        
        )
     }
 }

 export default ImagesList;