import { useState } from "react";

const ListGroup = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      {items.length === 0 && <p>No Item Found</p>}
      <ul className="list-group">
        {items.map((val, index) => (
          <li
            className="list-group-item active"
            style={selectedIndex === index ? { border: "2px solid" } : {}}
            key={val}
            onClick={() => setSelectedIndex(index)}
          >
            {val}
          </li>
        ))}
      </ul>
    </>
  );
};
export default ListGroup;
