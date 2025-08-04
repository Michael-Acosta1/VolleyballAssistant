import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import { DataTable } from "react-native-paper";
import { useState, useEffect } from "react";
import { dbData, uid, db } from "./components/login";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const TeamRoster = () => {
  // const [teams, setDbd] = useState(dbData[0].teams);
  let location = useLocation();
  const teamName = [location.state.teamName];
  const [teams, setTeamData] = useState(dbData[0].teams);

  console.log("td", teams);
  console.log("db", dbData);

  const handleEditRoster = async (player) => {
    console.log("player", player, player[1]);
    console.log("teammmmm", teams);

    // setDbd((prevData) => {
    //   prevData[teamName][player[0]].FirstName = "Hello";
    // });
    setTeamData((prevData) => ({
      ...prevData,
      [teamName]: {
        ...prevData[teamName],
        ...newteam[teamName],
      },
    }));

    const newteam = {
      UT: {
        JaredS: {
          FirstName: "Jared",
          Jersey: 12,
          LastName: "S",
          PrimaryPosition: "OH",
          SecondaryPosition: "Lib",
        },
      },
    };

    console.log("testttt", teams);
    await setDoc(doc(db, `users/`, uid), {
      teams,
    });
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
          {teams &&
            Object.entries(teams[teamName]).map((player) => {
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
