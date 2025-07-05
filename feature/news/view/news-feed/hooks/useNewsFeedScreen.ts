import { HttpNewsFeedGateway } from "@/feature/news/infrastructure/gateways/NewsFeedGateway";
import { NewsFeedPresenter } from "@/feature/news/infrastructure/presenters/NewsFeedPresenter";
import { News } from "@/feature/news/model/entities/News";
import { INewsFeedScreen } from "@/feature/news/model/presenter/INewsFeedPresenter";
import { useEffect, useState } from "react";

export const useNewsFeedScreen = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [error, setError] = useState<string | null>(null);

    const screenHandler: INewsFeedScreen = {
        getNewsSuccess: (news: News[]) => {
            setNews(news);
            setLoading("success");
            setError(null);
        },
        getNewsError: (error: any) => {
            setError(error?.message || "Failed to load news");
            setLoading("error");
        },
    }

    const presenter = NewsFeedPresenter(HttpNewsFeedGateway(), screenHandler);

    useEffect(() => {
        setLoading("loading");
        presenter.getNews();
    }, []);

    return {
        news,
        loading,
        error,
    }
}