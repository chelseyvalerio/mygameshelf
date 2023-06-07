import React from "react";
import { selectedGame } from './Search';

export default function gameShelf() {
  return (
    <div>
      <section className="all-game-cards">
      <h1 id="my-work">Game Collection:</h1>
      
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