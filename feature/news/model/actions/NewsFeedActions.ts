import { News } from "../entities/News";
import { INewsGateway } from "../gateways/INewsGateway";

export interface INewsFeedAction {
    getNews: () => Promise<News[]>;
}
export const NewsFeedAction = (newsFeedGateway: INewsGateway): INewsFeedAction => {
    return {
        getNews: async (): Promise<News[]> => {
            return newsFeedGateway
                .getNews()
                .then(res => Promise.resolve(res))
                .catch(err => Promise.reject(err))
        }
    };
};
