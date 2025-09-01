import { Action } from "@/types/rockPaperScissors";
import { images } from "./Images";

export const ACTIONS: Action[] = ["scissors", "rock", "paper"];
export const ACTION_IMAGES = {
  scissors: images.scissors,
  rock: images.rock,
  paper: images.paper,
};
