import { createStackNavigator } from "react-navigation-stack";

import FaceDetection from "../Components/FaceDetection";
import Gallery from "../Components/FaceDetection/Gallery"
import EventEntry from "../Components/EventEntry";
import ImagesList from "../Components/ImagesList";


const StackNav = createStackNavigator(
  {
    FaceDetection: FaceDetection,
    Gallery:Gallery,
    EventEntry: EventEntry,
    ImagesList: ImagesList

  },
  {
    initialRouteName: "EventEntry",

    defaultNavigationOptions: {
      headerTintColor: "white",
      // headerTransparent: true,
      // headerStyle: { borderBottomWidth: 0 },
      headerStyle: {
        backgroundColor: "#90d4ed"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default StackNav;