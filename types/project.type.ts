export interface IProject {
  id: number;
  logo: string;
  name: string;
  slogan: string;
  site: string;
  tools: string;
  details: string;
  twitterUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  hidden: boolean | null;
  userId: number;
  votedUp?: any[] | null;
  apr: number;
  _count: {
    votedUp: number;
  };
}
