import { HttpNewsFeedGateway } from "@/features/news/infrastructure/gateways/NewsFeedGateway";
import { NewsFeedPresenter } from "@/features/news/infrastructure/presenters/NewsFeedPresenter";
import { News } from "@/features/news/model/entities/News";
import { INewsFeedScreen } from "@/features/news/model/presenter/INewsFeedPresenter";
import { useCallback, useEffect, useState } from "react";

export const useNewsFeedScreen = () => {
    const [allNews, setAllNews] = useState<News[]>([]);
    const [displayedNews, setDisplayedNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const ITEMS_PER_PAGE = 15;

    const screenHandler: INewsFeedScreen = {
        getNewsSuccess: (news: News[]) => {
            setAllNews(news);
            // Show first page
            const firstPage = news.slice(0, ITEMS_PER_PAGE);
            setDisplayedNews(firstPage);
            setCurrentPage(1);
            setHasMore(news.length > ITEMS_PER_PAGE);
            setLoading("success");
            setError(null);
        },
        getNewsError: (error: any) => {
            setError(error?.message || "Failed to load news");
            setLoading("error");
        },
    }

    const presenter = NewsFeedPresenter(HttpNewsFeedGateway(), screenHandler);

    const loadMoreNews = useCallback(() => {
        if (!hasMore || loading === "loading" || loadingMore) return;
        
        setLoadingMore(true);
        
        const nextPage = currentPage + 1;
        const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const newItems = allNews.slice(startIndex, endIndex);
        
        if (newItems.length > 0) {
            // Simulate loading delay to show spinner
            setTimeout(() => {
                setDisplayedNews(prev => [...prev, ...newItems]);
                setCurrentPage(nextPage);
                setHasMore(endIndex < allNews.length);
                setLoadingMore(false);
            }, 320);
        } else {
            setHasMore(false);
            setLoadingMore(false);
        }
    }, [allNews, currentPage, hasMore, loading, loadingMore]);

    useEffect(() => {
        setLoading("loading");
        presenter.getNews();
    }, []);

    return {
        news: displayedNews,
        loading,
        loadingMore,
        error,
        loadMoreNews,
        hasMore,
        currentPage,
        totalItems: allNews.length,
        displayedItems: displayedNews.length,
    }
}