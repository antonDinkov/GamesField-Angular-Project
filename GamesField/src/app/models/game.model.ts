export interface Game {
  _id: string;
  name: string;
  manufacturer: string;
  genre: string;
  views: number;
  played: number;
  iframeUrl: string;
  image: string;
  description: string;
  instructions: string;
  likes: string[]; // масив от ObjectId (стрингове)
  owner: string | null; // може да е null
}