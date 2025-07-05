import { News } from "../entities/News";

export interface INewsFeedScreen {
    getNewsSuccess?: (news: News[]) => void;
    getNewsError?: (error: any) => void;
}

export interface INewsFeedPresenter {
    getNews: () => Promise<void>;
}