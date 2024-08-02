import { useEffect, useState } from "react";
import "./board.css";
import PlayArea from "../PlayArea";

const logo = require("../../assets/snake-logo4.png");

function Board(params) {
    // Game Variables
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    let handleKeyPress = (e) => {
        if (
            (!isGameStarted && e.code === "Space") ||
            (!isGameStarted && e.code === " ")
        ) {
            setIsGameStarted(true);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="App">
            <div>
                <div class="scores">
                    <h2 id="score">Score: {score}</h2>
                    <h2 id="highScore">Highscore: {highScore}</h2>
                </div>
                <div class="game-border-1">
                    <div class="game-border-2">
                        <div class="game-border-3">
                            <div id="game-board">
                                {isGameStarted ? (
                                    <PlayArea
                                        setScore={setScore}
                                        score={score}
                                        onGameOver={() => {
                                            setIsGameStarted(false);
                                            if (score > highScore)
                                                setHighScore(score);
                                            setScore(0);
                                        }}
                                    />
                                ) : (
                                    <>
                                        <h2 id="instruction-text">
                                            press Spacebar to Start The Game{" "}
                                            <br />
                                            Developed By: Umang
                                        </h2>
                                        <img
                                            src={logo}
                                            alt="snake-logo"
                                            id="logo"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;
