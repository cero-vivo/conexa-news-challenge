import { Config } from "./Config";

export const baseUrls = Config.baseUrls[Config.environment];

const composeURL = (url: string) => {
  return `${baseUrls}${url}`;
}

export const Endpoints = {
  newsFeed: {
    getAll: composeURL('/posts')
  },
  usersFeed: {
    getAll: composeURL('/users')
  }
} as const; 

