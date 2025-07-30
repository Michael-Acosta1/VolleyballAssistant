import React from "react";
const Header = ({ title }) => {
  return (
    <section>
      <div className="headers">
        <div className="headerText">{title}</div>
      </div>
    </section>
  );
};
export default Header;
