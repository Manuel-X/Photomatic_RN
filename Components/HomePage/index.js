import React, { Component } from "react";
import { View, Image } from "react-native";
// import { connect } from "react-redux";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Components
import FaceDetection from '../../Components/FaceDetection/CameraPage'

// Actions


class HomePage extends Component {

  
  render() {
    // const loading = this.props.loading;
    // if (loading) {    
    //   return <Image source={require('../TravelPackageList/assets/loading.gif')} style={{ height: '100%', width:'100%', }} />
    // }


    return (
      <Container style={styles.transparent}>
        <FaceDetection/>
      </Container>
    );
  }
}


export default HomePage;