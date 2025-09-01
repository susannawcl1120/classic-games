import { Action, GameMode } from "@/types/rockPaperScissors";
import { images } from "./Images";

export const ACTIONS: Action[] = ["scissors", "rock", "paper"];

export const ACTION_IMAGES = {
  scissors: images.scissors,
  rock: images.rock,
  paper: images.paper,
};

export const GAME_MODES: { label: string; value: GameMode }[] = [
  { label: "一局定勝負", value: "1" },
  { label: "三局兩勝", value: "3" },
  { label: "五局三勝", value: "5" },
];

export const GAME_MODE_MAP = {
  "1": "一局定勝負",
  "3": "三局兩勝",
  "5": "五局三勝",
};
