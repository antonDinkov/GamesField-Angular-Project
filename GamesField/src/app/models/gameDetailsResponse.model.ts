import { Game } from './game.model';

export interface GameDetailsResponse {
  post: Game;
  username: string;
  interactionCount: number;
  isLoggedIn: boolean;
  isAuthor: boolean;
  hasInteracted: boolean;
  interactorsNames: string;
  title: string;
}