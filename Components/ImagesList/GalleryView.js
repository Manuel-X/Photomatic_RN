import React, { Component } from 'react'
import {View} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";


import { connect } from "react-redux";
 class GalleryView extends Component {
     imagesList = this.props.faceImagesList.map (img => {
         return (
         {uri:img.link}
         )
     })

     onSwipeDown() {
       alert("HI");
      }
    render() {
        return (

    
            
            <GallerySwiper
                images={this.imagesList}
                initialNumToRender={this.props.navigation.getParam("num")+1}
                // Change this to render how many items before it.
                
                // Turning this off will make it feel faster
                // and prevent the scroller to slow down
                // on fast swipes.
                sensitiveScroll={false}
                initialPage={this.props.navigation.getParam("imageIndex")}
            />
     
            
        );
    }
}

const mapStateToProps  = state => {
    return {
      faceImagesList: state.faceImagesListReducer.faceImagesList ,
    };
  };

  export default connect(
    mapStateToProps
  )(GalleryView);