import io from "socket.io-client";
import {
  addPlayer,
  removePlayer,
  updatePlayerStatus,
  addGameInfo
} from "./dom";

let game = {};

const socket = io("http://192.168.0.6:3030");
const urlParams = new URLSearchParams(window.location.search);

socket.on("connect", () => {
  console.log("Connected");
  console.log(`Socket ID: ${socket.id}`);
});

// If correct URL params are given, try connecting to game room
if (urlParams) {
  socket.emit("join-room", {
    user: { name: urlParams.get("name") },
    room: urlParams.get("game")
  });
}

// Room responses on "join-room"
socket.on("room-joined", game => {
  addGameInfo(game);
  game.players.forEach(player => {
    addPlayer(player);
  });
});
socket.on(
  "room-not-found",
  () =>
    (document.querySelector(".lobby__response").innerHTML =
      "<h3>Room Not Found</h3>")
);
socket.on(
  "room-full",
  () =>
    (document.querySelector(".lobby__response").innerHTML = `
      <div>
        <h3>Room is full</h3>
        <p>Maximum amount of players for this room has been reached. 
          <a href="javascript:window.location.href=window.location.href">Try again...</a>
        </p>
      </div>`)
);

const readyBtn = document.querySelector(".lobby__ready-btn");
readyBtn.addEventListener("click", () => {
  socket.emit("player-ready");
});

socket.on("player-ready", () => console.log("Player ready"));

socket.on("countdown", time => {
  console.log(time);
});

socket.on("game-started", () => console.log("Game started!"));

socket.on("player-joined", player => {
  console.log("Player Joined");
  addPlayer(player);
});
socket.on("player-disconnected", id => {
  console.log("Player Disconnected");
  removePlayer(id);
});

/* const updateGame = data => {
  const players = document.querySelector(".lobby__players");
  game = data;
  players.innerHTML = "";
  game.players.forEach(player => {
    players.insertAdjacentHTML("beforeend", `<li>${player.name}</li>`);
  });
}; */

const cards = [
  {
    name: "sigma",
    img: "https://img.icons8.com/dusk/64/000000/sigma.png"
  },
  {
    name: "sigma",
    img: "https://img.icons8.com/dusk/64/000000/sigma.png"
  },
  {
    name: "pi",
    img: "https://img.icons8.com/dusk/64/000000/pi.png"
  },
  {
    name: "pi",
    img: "https://img.icons8.com/dusk/64/000000/pi.png"
  },
  {
    name: "gamma",
    img: "https://img.icons8.com/dusk/64/000000/gamma.png"
  },
  {
    name: "gamma",
    img: "https://img.icons8.com/dusk/64/000000/gamma.png"
  }
];

/*
const gameSetup = () => {
  const cardElements = document.querySelectorAll(".card");

  let unusedCards = cards;

  cardElements.forEach(element => {
    const cardFront = element.querySelector(".card__front");
    const randNum = Math.floor(Math.random() * unusedCards.length);
    const randomCard = unusedCards[randNum];
    unusedCards.splice(randNum, 1);
    element.setAttribute("data-cardName", randomCard.name);
    cardFront.style.backgroundImage = `url(${randomCard.img})`;
  });
};

document.addEventListener("DOMContentLoaded", gameSetup());

let prevCard = null;
let completedPairs = 0;

const flipCard = card => {
  const cardName = card.getAttribute("data-cardName");

  card.classList.toggle("flipped");
  const flippedCards = document.querySelectorAll(".card.flipped");

  if (prevCard !== null) {
    if (cardName === prevCard) {
      completeCards(flippedCards);
      prevCard = null;
    } else {
      setTimeout(() => {
        unflipCards(flippedCards);
      }, 500);
      prevCard = null;
    }
  } else {
    prevCard = cardName;
  }
};

const unflipCards = cards => {
  console.log("Unflip");
  cards.forEach(card => {
    card.classList.toggle("flipped");
  });
};

const completeCards = cards => {
  console.log("Complete");
  socket.emit("pairCompleted");
  cards.forEach(card => {
    card.classList.add("completed");
  });
  completedPairs++;
  unflipCards(cards);
  if (completedPairs === 3) alert("YOU WIN!");
};

const cardElements = document.querySelectorAll(".card");
cardElements.forEach(el => {
  el.addEventListener("click", ev => flipCard(ev.target));
});
 */