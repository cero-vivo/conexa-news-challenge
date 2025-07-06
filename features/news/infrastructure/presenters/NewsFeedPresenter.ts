import { INewsFeedAction } from "../../model/actions/NewsFeedActions";
import { INewsFeedPresenter, INewsFeedScreen } from "../../model/presenter/INewsFeedPresenter";

export const NewsFeedPresenter = (newsFeedAction: INewsFeedAction, screen: INewsFeedScreen): INewsFeedPresenter => {
  return {
    getNews: async (): Promise<void> => {
        try {
            const news = await newsFeedAction.getNews();
            screen?.getNewsSuccess?.(news);
        } catch (error) {
            screen?.getNewsError?.(error);
        }
    },
  };
};
