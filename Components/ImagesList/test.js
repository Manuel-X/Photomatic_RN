import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import Expo, { Constants, Permissions, Camera, MediaLibrary, FileSystem } from 'expo';

export default class App extends Component {
  state = {
    rollGranted: true,
    cameraGranted: true,
  };

  images = [{title:'1',link:"https://tinyjpg.com/images/social/website.jpg"},{title:'2',link:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Blue_morpho_butterfly.jpg/531px-Blue_morpho_butterfly.jpg"}]

  componentDidMount() {
    this.getCameraPermissions();
  }

  async c(image) {
    const extension = image.link.slice((image.link.lastIndexOf(".") - 1 >>> 0) + 2)
    if ((extension.toLowerCase() !== 'jpg') && (extension.toLowerCase() !== 'png') && (extension.toLowerCase() !== 'gif')) {
      this.setState({ loading: false, failed: true })
    }
    await FileSystem.downloadAsync(
        image.link,
    `${FileSystem.cacheDirectory + image.title}.${ extension }`
    )
    .then(({ uri }) => {
      console.log("URI!!!!!!!!!!!!",`${FileSystem.cacheDirectory + image.title}.${ extension }`)
    })
  }

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log('Uh oh! The user has not granted us permission.');
    }
    this.getCameraRollPermissions();
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

  async takePictureAndCreateAlbum(image){
    console.log('tpaca', image);
    this.c(image)

    const asset = await MediaLibrary.createAssetAsync(`${FileSystem.cacheDirectory + image.title}.jpg`);
    console.log('asset', asset);
    MediaLibrary.createAlbumAsync('Expo', asset)
      .then(() => {
        Alert.alert('Album created!')
      })
      .catch(error => {
        Alert.alert('An Error Occurred!')
      });
  };


  saveAllPhotos = () => {
      this.images.forEach(image=>{
          console.log(image)
          this.takePictureAndCreateAlbum(image)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.saveAllPhotos()
              : Alert.alert('Permissions not granted')
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Snap
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
