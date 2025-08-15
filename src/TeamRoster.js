import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useGlobalData } from "./components/GlobalContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./components/login";

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

  const handleEditRoster = async (player) => {
    console.log("player", player, player[1]);
    setDbdatas((prevData) => ({
      ...prevData,
      teams: {
        ...prevData.teams,
        [teamName]: {
          ...prevData.teams[teamName],
          [player[0]]: {
            ...prevData.teams[teamName][player[0]],
            FirstName: "James",
          },
        },
      },
    }));
    setType("updatePlayer");
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
                    <button
                      className="teamRosterHeaderEdit"
                      onClick={() => handleEditRoster(player)}
                    >
                      edit
                    </button>
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
