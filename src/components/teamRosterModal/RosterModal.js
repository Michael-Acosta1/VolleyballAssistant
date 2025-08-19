import "./RosterModal.css";
import { useState } from "react";

export const RosterModal = ({
  onSubmit,
  onDelete,
  onCancel,
  player,
  teamName,
  addPlayer,
}) => {
  const [tempPlayer, setTempPlayer] = useState(player);
  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  console.log("players info in roster modal", tempPlayer);

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
      if (addPlayer) {
        setTempPlayer((prevData) => ({
          ...prevData,
          0: newJersey,
        }));
      }
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

  const handleClose = () => {
    if (addPlayer) {
      setTempPlayer({
        0: "",
        1: {
          FirstName: "",
          LastName: "",
          Jersey: "",
          PrimaryPosition: "",
          SecondaryPosition: "",
        },
      });
    }
    onCancel(setRosterModalOpen);
  };
  const handleSubmit = () => {
    onSubmit(tempPlayer, setRosterModalOpen, teamName);
    if (addPlayer) {
      setTempPlayer({
        0: "",
        1: {
          FirstName: "",
          LastName: "",
          Jersey: "",
          PrimaryPosition: "",
          SecondaryPosition: "",
        },
      });
    }
  };
  return (
    <div>
      <button
        className="teamRosterHeaderEdit"
        onClick={() => setRosterModalOpen(true)}
      >
        {player.length > 0 ? "edit" : "add"}
      </button>
      {rosterModalOpen && (
        <div className="rosterModal-container">
          <div className="rosterModal">
            <button className="btnC btn-cancel" onClick={() => handleClose()}>
              X
            </button>
            <div className="rosterModal-header">
              <h1>
                {player.length > 0
                  ? `Edit ${player[1].FirstName}'s Information`
                  : "Add New Player"}
              </h1>
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
                  style={{ textAlign: "center", paddingLeft: "20px" }}
                  type="number"
                  value={tempPlayer[1].Jersey}
                  onChange={handleJerseyChange}
                  onBlur={handleBlurJerseyChange}
                />
              </div>
              <div className="inputLabel">
                <div style={{ paddingBottom: "4px" }}>Primary Position:</div>
                <select
                  id="my-select"
                  value={tempPlayer[1].PrimaryPosition}
                  onChange={handlePrimaryPositionChange}
                  className="positionDropdown"
                >
                  <option value="">Select a Position</option>
                  <option value="OH">Outside Hitter</option>
                  <option value="RS">Rightside Hitter</option>
                  <option value="MB">Middle Blocker</option>
                  <option value="S">Setter</option>
                  <option value="L">Libero</option>
                </select>
              </div>
              <div className="inputLabel">
                <div style={{ paddingBottom: "4px" }}>SecondaryPosition:</div>
                <select
                  id="my-select"
                  value={tempPlayer[1].SecondaryPosition}
                  onChange={handleSecondaryPositionChange}
                  className="positionDropdown"
                >
                  <option value="">Select a Position</option>
                  <option value="OH">Outside Hitter</option>
                  <option value="RS">Rightside Hitter</option>
                  <option value="MB">Middle Blocker</option>
                  <option value="S">Setter</option>
                  <option value="L">Libero</option>
                </select>
              </div>
            </div>
            <div className="rosterModal-footer">
              <button
                className="btn btn-delete"
                onClick={() => onDelete(player, setRosterModalOpen)}
              >
                Delete Player
              </button>
              <button className="btn btn-save" onClick={() => handleSubmit()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
