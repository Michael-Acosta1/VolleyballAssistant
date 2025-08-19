import "./teamGames.css";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useGlobalData } from "../GlobalContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../login";

const TeamGames = () => {
  let location = useLocation();
  const { dbDatas, setDbdatas, uid } = useGlobalData();
  const teamName = [location.state.teamName];

  return (
    <div className="tables">
      <Header title={"Team Games"} />
      <div className="teamGames">
        <table className="teamGamesHeader">
          <tr>
            <th className="teamGamesHeaderText">Games</th>
            <th className="teamGamesHeaderText">Match Style</th>
          </tr>
          {dbDatas &&
            Object.entries(dbDatas.teams[teamName]).map((player) => {})}
        </table>
      </div>
      <button type="button" className="addGamesButton">
        Create A New Game
      </button>
    </div>
  );
};
export default TeamGames;
