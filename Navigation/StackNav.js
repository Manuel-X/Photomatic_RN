import { createStackNavigator } from "react-navigation-stack";

import FaceDetection from "../Components/FaceDetection";
import Gallery from "../Components/FaceDetection/Gallery"
import EventEntry from "../Components/EventEntry";
import ImagesList from "../Components/ImagesList";
// import ListView from "../Components/ImagesList/ListView";
import DeckView from '../Components/ImagesList/DeckView';
import GalleryView from '../Components/ImagesList/GalleryView';


const StackNav = createStackNavigator(
  {
    FaceDetection: FaceDetection,
    Gallery:Gallery,
    EventEntry: EventEntry,
    ImagesList: ImagesList,
    // ListView: ListView,
    DeckView: DeckView,
    GalleryView:GalleryView

  },
  {
    initialRouteName: "ImagesList", //EventEntry

    defaultNavigationOptions: {
      headerTintColor: "white",
      // headerTransparent: true,
      // headerStyle: { borderBottomWidth: 0 },
      headerStyle: {
        backgroundColor: "#007BFF",
  
      },
      headerTitleStyle: {
        fontWeight: "bold"
      },
    }
  }
);

export default StackNav;