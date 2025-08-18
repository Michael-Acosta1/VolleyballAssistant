import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useGlobalData } from "./components/GlobalContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./components/login";
import { RosterModal } from "./components/teamRosterModal/RosterModal.js";

const TeamRoster = () => {
  let location = useLocation();
  const { dbDatas, setDbdatas, uid } = useGlobalData();
  const teamName = [location.state.teamName];
  const [type, setType] = useState("");

  useEffect(() => {
    if (type === "updatePlayer") {
      let teams = dbDatas.teams;
      console.log("testttt", teams);
      setType("");
      setDoc(doc(db, `users/`, uid), {
        teams,
      });
    }
  }, [dbDatas, type]);

  const handleEditRoster = (player, setRosterModalOpen) => {
    console.log("player", player, player[1]);
    setDbdatas((prevData) => ({
      ...prevData,
      teams: {
        ...prevData.teams,
        [teamName]: {
          ...prevData.teams[teamName],
          [player[0]]: player[1],
        },
      },
    }));
    setType("updatePlayer");
    setRosterModalOpen(false);
  };
  const handleCloseModal = (setRosterModalOpen) => {
    setRosterModalOpen(false);
  };

  return (
    <div className="tables">
      <Header title={"Team Roster"} />
      <div className="teamRoster">
        <table className="teamRosterHeader">
          <tr>
            <th className="teamRosterHeaderText">Jersey #</th>
            <th className="teamRosterHeaderText">Name</th>
            <th className="teamRosterHeaderText">Position 1</th>
            <th className="teamRosterHeaderText">Position 2</th>
            <td>
              <RosterModal
                onSubmit={handleEditRoster}
                onCancel={handleCloseModal}
                player={{
                  0: "",
                  1: {
                    FirstName: "",
                    LastName: "",
                    Jersey: "",
                    PrimaryPosition: "",
                    SecondaryPosition: "",
                  },
                }}
                teamName={teamName}
                addPlayer={true}
              />
            </td>
          </tr>
          {dbDatas &&
            Object.entries(dbDatas.teams[teamName]).map((player) => {
              console.log("team here", player, player[1].FirstName);
              return (
                <tr className="teamRosterHeaderText" key={player.id}>
                  <td>{player[1].Jersey}</td>
                  <td>
                    {player[1].FirstName} {player[1].LastName.charAt(0)}
                  </td>
                  <td>{player[1].PrimaryPosition}</td>
                  <td>{player[1].SecondaryPosition}</td>
                  <td>
                    <RosterModal
                      key={player.id}
                      onSubmit={handleEditRoster}
                      onCancel={handleCloseModal}
                      player={player}
                      teamName={teamName}
                    />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};
export default TeamRoster;
