export type IModule = {
  id: string;
  title: string;
  length: number;
  videoUrl: string;
  content: string;
};

export type ITrack = { 
  title: string;
  modules: IModule[];
  description: string;
  thumbnail: string;
  author: IAuthor;
  length: number;
  modulesCount: number;
  numberOfViews: number;
};

export type IAuthor = {
  name: string;
  photo: string;
};
