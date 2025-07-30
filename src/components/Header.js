import React from "react";
import images from "./assets/images";
import { ImageBackground } from "react-native";
const Header = ({ title }) => {
  return (
    <section>
      <ImageBackground
        source={images.myImage1}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
      >
        <div className="headerText">{title}</div>
      </ImageBackground>
    </section>
  );
};
export default Header;
