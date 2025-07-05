import { apiClient } from "@/constants/ApiClient";
import { Endpoints } from "@/constants/Endpoints";
import { News } from "../../model/entities/News";
import { INewsGateway } from "../../model/gateways/INewsGateway";

export const HttpNewsFeedGateway = (): INewsGateway => {
  return {
    getNews: async (): Promise<News[]> => {
      try {
        console.log('getNews', Endpoints.newsFeed.getAll);
        const response = await apiClient.get<News[]>(Endpoints.newsFeed.getAll);
        console.log('news feed response', response);
        return response.data;
      } catch (error) {
        console.error('Error fetching news feed:', error);
        throw error;
      }
    },
  };
};


