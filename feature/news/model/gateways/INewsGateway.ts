import { News } from "../entities/News";

export interface INewsGateway {
    getNews: () => Promise<News[]>;
  } 