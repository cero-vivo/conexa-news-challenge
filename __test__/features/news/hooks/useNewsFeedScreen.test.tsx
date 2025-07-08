// @ts-nocheck
import { News, NewsStatus } from '@/features/news/model/entities/News';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.useFakeTimers();

// Mock del Presenter para interceptar screen handler
const mockGetNews = jest.fn();
let mockScreenHandler: any;

jest.mock('@/features/news/infrastructure/presenters/NewsFeedPresenter', () => {
  return {
    NewsFeedPresenter: (_action: any, screen: any) => {
      mockScreenHandler = screen;
      return {
        getNews: mockGetNews,
      };
    },
  };
});

// Mock del Gateway para evitar llamadas HTTP reales
jest.mock('@/features/news/infrastructure/gateways/NewsFeedGateway', () => ({
  HttpNewsFeedGateway: () => ({})
}));

import { useNewsFeedScreen } from '@/features/news/view/news-feed/hooks/useNewsFeedScreen';

describe('useNewsFeedScreen', () => {
  const sampleNews: News[] = Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    slug: `news-${idx + 1}`,
    url: `https://example.com/news/${idx + 1}`,
    title: `News ${idx + 1}`,
    content: 'Content',
    image: '',
    thumbnail: '',
    status: NewsStatus.PUBLISHED,
    category: 'general',
    publishedAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    userId: 1,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('carga correctamente las noticias y maneja paginación', async () => {
    // getNewsMock simula invocación exitosa
    mockGetNews.mockImplementation(() => {
      return Promise.resolve().then(() => {
        mockScreenHandler.getNewsSuccess(sampleNews);
      });
    });

    let hookResult: any = {};
    const TestComponent: React.FC = () => {
      hookResult = useNewsFeedScreen();
      return null;
    };

    await act(async () => {
      renderer.create(<TestComponent />);
    });

    // Esperamos a que se resuelva la promesa del mock
    await act(async () => {
      await Promise.resolve();
    });

    expect(hookResult.loading).toBe('success');
    expect(hookResult.news.length).toBe(15); // Página inicial
    expect(hookResult.hasMore).toBe(true);

    // Cargar más noticias
    await act(async () => {
      hookResult.loadMoreNews();
    });

    // Avanzamos timers para el delay de 320 ms definido en el hook
    act(() => {
      jest.advanceTimersByTime(320);
    });

    expect(hookResult.news.length).toBe(20);
    expect(hookResult.hasMore).toBe(false);
  });

  it('maneja errores al obtener noticias', async () => {
    const mockError = new Error('fail');
    mockGetNews.mockImplementation(() => {
      return Promise.resolve().then(() => {
        mockScreenHandler.getNewsError(mockError);
      });
    });

    let hookResult: any;
    const TestComponent: React.FC = () => {
      hookResult = useNewsFeedScreen();
      return null;
    };

    await act(async () => {
      renderer.create(<TestComponent />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(hookResult.loading).toBe('error');
    expect(hookResult.error).toBe('fail');
  });
}); 