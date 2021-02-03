const express = require("express");
const router = express.Router();


// router.get("/", function (req, res) {
//   res.status(200).json({
//     //teamArray,
//     query: req.query,
//   });
// });

let teamArray = [
  {
    id: 1,
    name: "lakers",
    playersArray: [
      {
        player: "kobe",
      },
      {
        player: "shaq",
      },
    ],
  },
];


let showTeamArray = [
  {
    "team": "lakers" 
  },
  {
    "team": "knicks"
  },
  {
    "team": "nets"
  }
]


router.get("/", function (req, res) {
  res.status(200).render("team", { teams: showTeamArray });
  // console.log(req.query);
  // res.status(200).json({
  //   //teamArray,
  //   query: req.query,
  // });
});

router.get("/:teamID", function (req, res) {
  let result = null;
  let teamIDNumber = Number(req.params.teamID);
  teamArray.forEach((team) => {
    if (team.id === teamIDNumber) {
      result = team;
    }
    if (team.id !== teamIDNumber) {
      result = "Sorry, the team you are looking for does not exist";
    }
  });
  res.status(200).json({
    team: result,
  });
});


router.post("/", function (req, res) {
  res.status(200).json({
    teamArray,
  });
});


router.post("/add-players/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);
  let message;
  let targetTeam;
  let teamIndex;
  teamArray.forEach((team, index) => {
    if (team.id === teamIDNumber) {
      let singleTeamArray = team.playersArray;
      singleTeamArray.push(req.body);
      targetTeam = team;
      teamIndex = index;
      return;
    }
  });
  //console.log(JSON.stringify(teamArray));
  //set the playersArray to targetTeamArray
  let targetTeamArray = targetTeam.playersArray;
  //return only players array
  let playersNameArray = targetTeamArray.map(function (item) {
    return item.player;
  });
  //using some to check the array and using indexOf to compare, and if it exists return true
  let isDuplicate = playersNameArray.some(function (item, index) {
    return playersNameArray.indexOf(item) != index;
  });
  //if is true, we set a message for the user to see
  if (isDuplicate) {
    message = "Sorry, player already exist!";
  }
  //we filter player the duplicate using Map Filter and IndexOf
  let results = targetTeamArray
    .map((item) => item.player)
    .filter(function (player, index, collection) {
      return collection.indexOf(player) == index;
    });
  //once we grab the array we push it to the object
  let resultObj = [];
  results.forEach((item, index) => {
    resultObj.push({ player: item });
  });
  //set playersArray
  teamArray[teamIndex].playersArray = resultObj;
  res.status(200).json({
    teamArray,
    message,
  });
});


router.put("/edit-players/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);
  let obj = {};
  let teamIndex;
  let playerIndex;
  // teamArray.forEach((team, indexTeam) => {
  //   if (team.id === teamIDNumber) {
  //     teamIndex = indexTeam;
  //     let singleTeamArray = team.playersArray;
  //     singleTeamArray.forEach((item, indexPlayer) => {
  //       if (item.player === req.body.player) {
  //         obj = { ...item, ...req.body };
  //         playerIndex = indexPlayer;
  //       }
  //     });
  //   }
  // });
  teamArray.forEach((team, indexTeam) => {
    if (team.id === teamIDNumber) {
      teamIndex = indexTeam;
      let singleTeamArray = team.playersArray;
      singleTeamArray.forEach((item, indexPlayer) => {
        if (item.player === req.query.player) {
          obj = { ...item, ...req.query };
          playerIndex = indexPlayer;
        }
      });
    }
  });


  console.log(teamArray[teamIndex].playersArray[playerIndex]);
  teamArray[teamIndex].playersArray[playerIndex] = obj;
  res.json(teamArray);
});


router.put("/add-new-player-to-team/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);
  teamArray.forEach((item) => {
    if (item.id === teamIDNumber) {
      item.playersArray.push(req.body);
    }
  });
  res.json(teamArray);
});


router.delete("/delete-player-by-name/:teamID", function (req, res) {
  let teamIDNumber = Number(req.params.teamID);
  let foundTeamPlayerArray;
  let targetTeamIndex;
  teamArray.forEach((item, index) => {
    if (item.id === teamIDNumber) {
      foundTeamPlayerArray = item.playersArray;
      targetTeamIndex = index;
      return;
    }
  });
  // let filteredTeamPlayerArray = foundTeamPlayerArray.filter((item) => {
  //   console.log(item);
  //   return item.player !== req.body.player;
  // });
  let filteredTeamPlayerArray = foundTeamPlayerArray.filter(
    (item) => item.player !== req.body.player
  );
  teamArray[targetTeamIndex].playersArray = filteredTeamPlayerArray;
  res.send(teamArray);
});


module.exports = router;