import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, DataTable } from "react-native-paper";
import TeamRoster from "./TeamRoster";
import Header from "./components/Header";

const HomepageBody = ({ existingTeamNames, handleRemoveTeam }) => {
  if (existingTeamNames.length) {
    return (
      <section>
        <div className="bodyStyle">
          <div className="teamSelection">Select Existing Team</div>
        </div>
        {existingTeamNames.map((teamName) => {
          return (
            <>
              <div className="teamSection">
                <Link to="/TeamRoster" state={{ teamName: teamName }}>
                  <div variant="outlined" className="teamsList">
                    {teamName.text}
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
  const [todos, setTodos] = useState([]);
  const [existingTeamNames, setExistingTeamNames] = useState([
    { id: 1, text: "UT" },
    { id: 2, text: "A&M" },
  ]);
  let items = ["setter", "OH", "RS", "MB", "Lib"];
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

    setExistingTeamNames((l) =>
      l.filter((item) => item.text !== selectedTeamName.text)
    );
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
