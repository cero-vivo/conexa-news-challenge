import { apiClient } from "@/constants/ApiClient";
import { Endpoints } from "@/constants/Endpoints";
import { News } from "../../model/entities/News";
import { INewsGateway } from "../../model/gateways/INewsGateway";

export const HttpNewsFeedGateway = (): INewsGateway => {
  return {
    getNews: async (): Promise<News[]> => {
      try {
        const response = await apiClient.get<News[]>(Endpoints.newsFeed.getAll);
        return response.data;
      } catch (error) {
        console.log('Error fetching news feed:', error);
        throw error;
      }
    },
  };
};


