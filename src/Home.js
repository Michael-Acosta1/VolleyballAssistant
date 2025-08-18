import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Header from "./components/Header";
import { useGlobalData } from "./components/GlobalContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./components/login";

const HomepageBody = ({
  existingTeamNames,
  handleRemoveTeam,
  teams,
  //setTeamData,
}) => {
  console.log(existingTeamNames.length);
  if (existingTeamNames.length) {
    return (
      <section>
        <div className="bodyStyle">
          <div className="teamSelection">Select Existing Team</div>
        </div>
        {existingTeamNames.map((teamName) => {
          console.log(teamName);
          return (
            <>
              <div className="teamSection">
                <Link
                  to="/TeamRoster"
                  state={{
                    teamName: teamName,
                    //td: teams,
                  }}
                >
                  <div variant="outlined" className="teamsList">
                    {teamName}
                  </div>
                </Link>

                <div className="buttonGroup">
                  <button
                    className="button"
                    onClick={() => handleRemoveTeam(teamName)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </section>
    );
  }
};

const AddTeam = ({
  text,
  onChangeText,
  newTeamCounter,
  setNewTeamCounter,
  handleButtonClick,
}) => {
  return (
    <>
      <div className="teamSection">
        <Button onPress={() => setNewTeamCounter(1)}>
          <Text>Create A New Team</Text>
        </Button>
      </div>
      {newTeamCounter == 1 && (
        <>
          <div className="teamSection">
            <div className="newTeam">Enter Team Name</div>
            <TextInput
              id="newTeamName"
              style={{
                backgroundColor: "grey",
                borderRadius: 5,
                height: 40,
                paddingLeft: 20,
              }}
              placeholder="new team"
              onChangeText={onChangeText}
              value={text}
            />

            <TouchableOpacity onPress={handleButtonClick}>
              <div className="newTeam">Add</div>
            </TouchableOpacity>
          </div>
        </>
      )}
    </>
  );
};

function HomepageFooter() {
  return (
    <section>
      <div className="footer">
        <div className="footerText">Contact Us!</div>
        <div className="footerText">email@fakeemail.com</div>
        <div className="footerText">9155496646</div>
      </div>
    </section>
  );
}

const Home = () => {
  const [text, setText] = useState("");
  const { dbDatas, setDbdatas, uid } = useGlobalData();
  const [type, setType] = useState("");

  const [teams, setTeamData] = useState([]);
  console.log("database data in home:", dbDatas, Object.keys(dbDatas).length);

  const [existingTeamNames, setExistingTeamNames] = useState([]);
  //useEffect to only render ExistingTeams the data if dbData changes
  useEffect(() => {
    console.log("this ran during the homepage", dbDatas);
    //temporary array to get the list of Teams
    if (Object.keys(dbDatas).length > 0) {
      setTeamData(dbDatas.teams);
      let tempArray = [];
      Object.keys(dbDatas.teams).map((key) => {
        tempArray.push(key);
      });
      setExistingTeamNames(tempArray);
    }
  }, [dbDatas]);
  useEffect(() => {
    if (type === "addTeam") {
      setType("");
      setDoc(doc(db, `users/`, uid), {
        teams,
      });
    }
  }, [existingTeamNames]);

  console.log("existing: ", existingTeamNames);
  const [newTeamCounter, setNewTeamCounter] = useState(0);

  const handleButtonClick = () => {
    if (text.length > 0) {
      let newTeamName;
      const teamName = existingTeamNames[existingTeamNames.length - 1];
      if (!teamName) {
        newTeamName = { id: 1, text };
      } else {
        const id = teamName.id + 1;
        newTeamName = { id, text };
      }

      setDbdatas((prevData) => ({
        ...prevData,
        teams: {
          ...prevData.teams,
          [newTeamName.text]: {},
        },
      }));
      setType("addTeam");
      console.log("dbdata now", dbDatas);

      //setExistingTeamNames([...existingTeamNames, newTeamName.text]);
      setText("");
      setNewTeamCounter(0);
    }
  };
  const handleRemoveTeam = (selectedTeamName) => {
    console.log(selectedTeamName);
    console.log("b4: ", existingTeamNames);

    setExistingTeamNames((l) => l.filter((item) => item !== selectedTeamName));
    console.log("now", existingTeamNames);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <div className="tables">
      <main>
        <Header title={"Volleyball Assistant"} />
        {existingTeamNames && (
          <HomepageBody
            existingTeamNames={existingTeamNames}
            handleRemoveTeam={handleRemoveTeam}
            teams={teams}
            //setTeamData={setTeamData}
          />
        )}

        <AddTeam
          text={text}
          onChangeText={handleTextChange}
          newTeamCounter={newTeamCounter}
          setNewTeamCounter={setNewTeamCounter}
          handleButtonClick={handleButtonClick}
        />
      </main>
      <HomepageFooter />
    </div>
  );
};

export default Home;
