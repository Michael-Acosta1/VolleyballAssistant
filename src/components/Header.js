import React from "react";
import images from "./assets/images";
import { ImageBackground } from "react-native";
const Header = ({ title }) => {
  return (
    <section>
      <ImageBackground
        source={images.myImage3}
        style={{ width: "100%", height: 250 }}
        resizeMode="stretch"
      >
        <div className="headerText">{title}</div>
      </ImageBackground>
    </section>
  );
};
export default Header;
