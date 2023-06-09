import React from "react";
//import { selectedGame } from './Search';

export default function Home() {
  return (
    <div>
      <section className="all-game-cards">
      <h1 id="my-work">My Game Shelf</h1>
      <p>Welcome to our Board Game Selection App! Are you a board game enthusiast looking for an easy way to discover and save your favorite games? Look no further! </p>
      <p>Our app provides a user-friendly interface that allows you to browse through a vast collection of board games sourced from an API. Once you find a game you love, simply add it to your personal collection for future reference. </p>
      
        <img src="https://t4.ftcdn.net/jpg/02/32/54/61/360_F_232546104_KNwtf8IENcwkK0h4HOQlo1wNISPN13aB.jpg" alt="My Game Shelf" />
      </section>  
    </div>
  );
}