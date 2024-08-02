import { useEffect, useState } from "react";
import "./playArea.css";
import Snake from "../Snake";
import Food from "../Food";
import { useInterval } from "../../utills/utilities";
let snakePixelSize = 3.5;

const getRandomFood = () => {
    let min = 1;
    let max = 98;
    let x =
        Math.floor((Math.random() * (max - min + 1) + min) / snakePixelSize) *
        snakePixelSize;
    let y =
        Math.floor((Math.random() * (max - min + 1) + min) / snakePixelSize) *
        snakePixelSize;
    return [x, y];
};

function PlayArea({ onGameOver = () => {}, score = 0, setScore = () => {} }) {
    // Game Variables
    const [food, setFood] = useState(getRandomFood());
    const [direction, setDirection] = useState("right");
    const [speed, setSpeed] = useState(300);
    const [snakePixels, setSnakePixels] = useState([
        [52.5, 49],
        [49, 49],
    ]);

    let moveSnake = () => {
        let dots = [...snakePixels];
        let head = dots[dots.length - 1];

        switch (direction) {
            case "right":
                head = [head[0] + snakePixelSize, head[1]];
                break;
            case "left":
                head = [head[0] - snakePixelSize, head[1]];
                break;
            case "down":
                head = [head[0], head[1] + snakePixelSize];
                break;
            case "up":
                head = [head[0], head[1] - snakePixelSize];
                break;
        }
        dots.push(head);
        dots.shift();
        setSnakePixels((snakePixels) => dots);
    };

    // setInterval custom hook
    useInterval(moveSnake, speed);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        onSnakeOutOfBounds();
        onSnakeCollapsed();
        onSnakeEats();
    }, [snakePixels]);

    let gameOver = () => {
        onGameOver();
    };

    let onSnakeOutOfBounds = () => {
        let head = snakePixels[snakePixels.length - 1];
        if (head[0] >= 99 || head[1] >= 99 || head[0] < 0 || head[1] < 0) {
            onGameOver();
        }
    };

    let onSnakeCollapsed = () => {
        let tempSnake = [...snakePixels];
        let head = tempSnake[tempSnake.length - 1];
        tempSnake.pop();
        tempSnake.forEach((dot) => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                gameOver();
            }
        });
    };

    let onSnakeEats = () => {
        let head = snakePixels[snakePixels.length - 1];
        let foodTemp = food;
        if (head[0] == foodTemp[0] && head[1] == foodTemp[1]) {
            setFood(getRandomFood());
            increaseSnake();
            increaseSpeed();
            setScore(score + 1);
        }
    };

    let increaseSnake = () => {
        let newSnake = [...snakePixels];
        newSnake.unshift([]);
        setSnakePixels(newSnake);
    };

    let increaseSpeed = () => {
        if (speed > 10) {
            setSpeed(speed - 20);
        }
    };

    let handleKeyPress = (e) => {
        switch (e.key) {
            case "ArrowUp":
                setDirection("up");
                break;
            case "ArrowDown":
                setDirection("down");
                break;
            case "ArrowLeft":
                setDirection("left");
                break;
            case "ArrowRight":
                setDirection("right");
                break;
            default:
                break;
        }
    };

    return (
        <div className="game-area">
            <Snake snakePixels={snakePixels} />
            <Food dot={food} />
        </div>
    );
}

export default PlayArea;
