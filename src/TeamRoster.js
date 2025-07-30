import "./App.css";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";
import { DataTable } from "react-native-paper";
import { useState, useEffect } from "react";
const TeamRoster = () => {
  let location = useLocation();
  const teamName = [location.state.teamName.text];

  const [teamData, setTeamData] = useState([]);
  const tempUTdata = [
    { name: "Dorian", jersey: "1", position: "middle" },
    { name: "Alex", jersey: "12", position: "RS" },
  ];
  useEffect(() => {
    if (teamName == "UT") {
      setTeamData(tempUTdata);
    }
  }, []);

  const handleEditRoster = (player) => {
    console.log("player", player);
    let tee = teamData.filter((item) => item.jersey !== player.jersey);
    console.log("tttttt: ", tee);
    tee.push({ name: "Jake", jersey: "1", position: "middRSle" });
    setTeamData(tee);
  };
  return (
    <div className="tables">
      <Header title={"Team Roster"} />
      <div className="teamRoster">
        <table className="teamRosterHeader">
          <tr>
            <th className="teamRosterHeaderText">Jersey #</th>
            <th className="teamRosterHeaderText">Name</th>
            <th className="teamRosterHeaderText">Position</th>
          </tr>
          {teamData &&
            teamData.map((player) => {
              console.log("team here", player);
              return (
                <tr className="teamRosterHeaderText" key={player.id}>
                  <td>{player.jersey}</td>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
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
