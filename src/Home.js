import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Header from "./components/Header";
import { dbData } from "./components/login";

const HomepageBody = ({ existingTeamNames, handleRemoveTeam }) => {
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
                <Link to="/TeamRoster" state={{ teamName: teamName }}>
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
  const [existingTeamNames, setExistingTeamNames] = useState([]);
  //useEffect to only render ExistingTeams the data if dbData changes
  useEffect(() => {
    //temporary array to get the list of Teams
    let tempArray = [];
    console.log("dbdata:", dbData, "dbTeams, ", dbData[0].teams);
    Object.keys(dbData[0].teams).map((key) => {
      tempArray.push(key);
    });
    setExistingTeamNames(tempArray);
  }, [dbData]);

  console.log(existingTeamNames);
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
      setExistingTeamNames([...existingTeamNames, newTeamName]);
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
        <HomepageBody
          existingTeamNames={existingTeamNames}
          handleRemoveTeam={handleRemoveTeam}
        />
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
