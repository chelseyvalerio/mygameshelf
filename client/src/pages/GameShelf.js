import React, { useState, useEffect} from "react";
// import { selectedGame } from './Search';
// import { addGame } from "./Search";
import { useQuery } from "@apollo/client"
import {QUERY_USER} from "../utils/queries"


export default function GameShelf() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { loading, error, data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data && data.game) {
      setSelectedGame(data.game);
    }
  }, [data]);

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