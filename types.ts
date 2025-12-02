export interface Proposal {
  id: number;
  title: string;
  subtitle: string;
  background: string;
  target: string;
  course: string;
  activities: string[];
  tags: string[];
}

export interface CommentData {
  author: string;
  content: string;
  likes: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  date: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  PROPOSALS = 'proposals',
  GAME = 'game',
}