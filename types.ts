
export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  url: string;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  RETRO = 'Retro',
  CASUAL = 'Casual'
}
