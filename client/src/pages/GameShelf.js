import React from "react";
import { selectedGame } from './Search';

export default function gameShelf() {
  return (
    <div>
      <h1 id="my-work">My Game Shelf</h1>
      <p>Welcome to our Board Game Selection App! Are you a board game enthusiast looking for an easy way to discover and save your favorite games? Look no further! </p>
      <p>Our app provides a user-friendly interface that allows you to browse through a vast collection of board games sourced from an API. Once you find a game you love, simply add it to your personal collection for future reference. </p>
      <section className="all-game-cards">
        <div className="game-card">
          {selectedGame && (
            <article className="game-card">
              <a href={selectedGame.url}>
                <h3>{selectedGame.name}</h3>
                {/* need to update for game image */}
                <img src={selectedGame.image} alt={selectedGame.name} />
              </a>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}