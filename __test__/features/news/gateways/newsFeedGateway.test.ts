import { Endpoints } from '@/constants/Endpoints';
import { HttpNewsFeedGateway } from '@/features/news/infrastructure/gateways/NewsFeedGateway';

// Mock del cliente HTTP
jest.mock('@/constants/ApiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

import { apiClient } from '@/constants/ApiClient';
import { News, NewsStatus } from '@/features/news/model/entities/News';

describe('HttpNewsFeedGateway', () => {
  const sampleNews: News[] = [
    {
      id: 1,
      slug: 'sample-news',
      url: 'https://example.com/news/sample',
      title: 'Sample News',
      content: 'This is a sample news content',
      image: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumb.jpg',
      status: NewsStatus.PUBLISHED,
      category: 'general',
      publishedAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      userId: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna la lista de noticias cuando la petición es exitosa', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: sampleNews, status: 200 });

    const gateway = HttpNewsFeedGateway();
    const result = await gateway.getNews();

    expect(apiClient.get).toHaveBeenCalledWith(Endpoints.newsFeed.getAll);
    expect(result).toEqual(sampleNews);
  });

  it('propaga el error cuando la petición falla', async () => {
    const mockError = new Error('Network error');
    (apiClient.get as jest.Mock).mockRejectedValue(mockError);

    const gateway = HttpNewsFeedGateway();

    await expect(gateway.getNews()).rejects.toThrow('Network error');
    expect(apiClient.get).toHaveBeenCalledWith(Endpoints.newsFeed.getAll);
  });
}); 