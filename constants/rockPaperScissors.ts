import { Action, GameMode } from "@/types/rockPaperScissors";
import { images } from "./Images";

export const ACTIONS: Action[] = ["scissors", "rock", "paper"];

export const ACTION_IMAGES = {
  scissors: images.scissors,
  rock: images.rock,
  paper: images.paper,
};

export const GAME_MODES: { label: string; value: GameMode }[] = [
  { label: "rockPaperScissors.oneRound", value: "1" },
  { label: "rockPaperScissors.threeRound", value: "3" },
  { label: "rockPaperScissors.fiveRound", value: "5" },
];

export const GAME_MODE_MAP = {
  "1": "rockPaperScissors.oneRound",
  "3": "rockPaperScissors.threeRound",
  "5": "rockPaperScissors.fiveRound",
};
