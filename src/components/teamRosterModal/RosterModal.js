import "./RosterModal.css";
import { useState } from "react";

export const EditRosterModal = ({ onSubmit, onCancel, player }) => {
  const [tempPlayer, setTempPlayer] = useState(player);

  console.log("players info in roster modal", tempPlayer);
  //tempPlayer[1].Jersey = 111;
  console.log("players info now", tempPlayer);

  const handleFirstNameChange = (event) => {
    setTempPlayer((prevData) => ({
      ...prevData,
      1: {
        ...prevData[1],
        FirstName: event.target.value,
      },
    }));
  };
  const handleLastNameChange = (event) => {
    setTempPlayer((prevData) => ({
      ...prevData,
      1: {
        ...prevData[1],
        LastName: event.target.value,
      },
    }));
  };
  const handleJerseyChange = (event) => {
    if (event.target.value === "") {
      setTempPlayer((prevData) => ({
        ...prevData,
        1: {
          ...prevData[1],
          Jersey: "",
        },
      }));
    } else {
      const newJersey = Number(event.target.value);
      setTempPlayer((prevData) => ({
        ...prevData,
        1: {
          ...prevData[1],
          Jersey: newJersey,
        },
      }));
    }
  };
  const handleBlurJerseyChange = (event) => {
    if (event.target.value === "") {
      setTempPlayer((prevData) => ({
        ...prevData,
        1: {
          ...prevData[1],
          Jersey: 0,
        },
      }));
    }
  };

  const handlePrimaryPositionChange = (event) => {
    setTempPlayer((prevData) => ({
      ...prevData,
      1: {
        ...prevData[1],
        PrimaryPosition: event.target.value,
      },
    }));
  };
  const handleSecondaryPositionChange = (event) => {
    setTempPlayer((prevData) => ({
      ...prevData,
      1: {
        ...prevData[1],
        SecondaryPosition: event.target.value,
      },
    }));
  };

  return (
    <div className="rosterModal-container">
      <div className="rosterModal">
        <div className="rosterModal-header">
          <h1>Edit {player[1].FirstName}'s Information</h1>
        </div>
        <div className="rosterModal-body">
          <div className="inputLabel">
            First Name:
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={tempPlayer[1].FirstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="inputLabel">
            Last Name:
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={tempPlayer[1].LastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="inputLabel">
            Jersey #:
            <input
              style={{ textAlign: "center" }}
              type="number"
              value={tempPlayer[1].Jersey}
              onChange={handleJerseyChange}
              onBlur={handleBlurJerseyChange}
            />
          </div>
          <div className="inputLabel">
            Primary Position:
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={tempPlayer[1].PrimaryPosition}
              onChange={handlePrimaryPositionChange}
            />
          </div>
          <div className="inputLabel">
            SecondaryPosition
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={tempPlayer[1].SecondaryPosition}
              onChange={handleSecondaryPositionChange}
            />
          </div>
        </div>
        <div className="rosterModal-footer">
          <button className="btn btn-cancel" onClick={() => onCancel()}>
            Cancel
          </button>
          <button className="btn btn-save" onClick={() => onSubmit(tempPlayer)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
