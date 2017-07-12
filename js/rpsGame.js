
//===============================   INITIALIZE DATABASE   ===============================//
var config = {
  apiKey: "AIzaSyALBJmHnJ-XE_spiwd5dKua_b-RVz3BEl8",
  authDomain: "rpsgame-20a0b.firebaseapp.com",
  databaseURL: "https://rpsgame-20a0b.firebaseio.com",
  projectId: "rpsgame-20a0b",
  storageBucket: "rpsgame-20a0b.appspot.com",
  messagingSenderId: "568632824784"
};
firebase.initializeApp(config);

var database = firebase.database();




//===============================   VARIABLES   ===============================//

var batter = "";

var pitcher = "";

var winner = "";

var ball = 0;

var strike = 0;

var out = 0;






//===============================   FUNCTIONS   ===============================//

function decideWinner(batter, pitcher) {

  console.log("function batter: " + batter);
  console.log("function pitcher: " + pitcher);

  if(batter === pitcher) {
    // winner = "Foul Ball!";
    console.log("foul ball");
    // $("#winner").html("Foul Ball!");

    database.ref("/stats").set({
      call: "Foul Ball!",
      strikes: strike,
      balls: ball,
      outs: out
    });
    database.ref("/batter").set({
      action: "",
      value: 0
    });
    database.ref("/pitcher").set({
      action: "",
      value: 0
    });
  }

  if(batter === "rock" && pitcher === "paper" || batter === "paper" && pitcher === "scissors" || batter === "scissors" && pitcher === "rock") {
    // winner = "Strike!";
    console.log("strike");
    // $("#winner").html("Strike!");

    strike++;
    // $("#strikes").html(strike);

    database.ref("/stats").set({
      call: "Strike!",
      strikes: strike,
      balls: ball,
      outs: out
    });
    database.ref("/batter").set({
      action: "",
      value: 0
    });
    database.ref("/pitcher").set({
      action: "",
      value: 0
    });
  }

  if(batter === "rock" && pitcher === "scissors" || batter === "paper" && pitcher === "scissors" || batter === "scissors" && pitcher === "paper") {
    // winner = "Ball!";
    console.log("ball");
    // $("#winner").html("Ball!");

    ball++;
    // $("#balls").html(ball);

    database.ref("/stats").set({
      call: "Ball!",
      strikes: strike,
      balls: ball,
      outs: out
    });
    database.ref("/batter").set({
      action: "",
      value: 0
    });
    database.ref("/pitcher").set({
      action: "",
      value: 0
    });
  }

}





//===============================   EVENTS   ===============================//
$("#batter").on("change", function(event) {
  event.preventDefault();

  var swing = $("#batter").val();
  console.log("Swing: " + swing);

  database.ref("/batter").set({
    action: swing
  });

  var pitch = $("#pitcher").val();
  console.log("Pitch Val: " + pitch);

  if(pitch !== null) {
    console.log("Pitch !== null");

    decideWinner(batter, pitcher);

    $("#winner").html(winner);
  }
});


$("#pitcher").on("change", function(event) {
  event.preventDefault();

  var pitch = $("#pitcher").val();
  console.log("Pitch: " + pitch);

  database.ref("/pitcher").set({
    action: pitch
  });

  var swing = $("#batter").val();
  console.log("Swing Val: " + swing);

  if(swing !== null) {
    console.log("Swing !== null");

    decideWinner(batter, pitcher);

    $("#winner").html(winner);
  }
});







//===============================   MAIN   ===============================//
$($(document).ready(function() {
  database.ref("/batter").set({
    action: "",
    value: 0
  });
  database.ref("/pitcher").set({
    action: "",
    value: 0
  });
  database.ref("/stats").set({
    call: "",
    strikes: 0,
    balls: 0,
    outs: 0
  });
}));





database.ref().on("value", function(snapshot) {

  batter = snapshot.val().batter.action;
  $("#batter").val(batter);
  console.log("Batter: " + batter);

  pitcher = snapshot.val().pitcher.action;
  $("#pitcher").val(pitcher);
  console.log("Pitcher: " + pitcher);

  winner = snapshot.val().stats.call;
  $("#winner").html(winner);
  console.log("Call is: " + winner);

  strike = snapshot.val().stats.strikes;
  $("#strikes").html(strike);
  console.log("Strikes: " + strike);

  ball = snapshot.val().stats.balls;
  $("#balls").html(ball);
  console.log("Balls: " + ball);



}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

















//===============================   END   ===============================//
