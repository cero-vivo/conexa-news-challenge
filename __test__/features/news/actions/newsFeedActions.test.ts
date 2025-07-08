import { NewsFeedAction } from '@/features/news/model/actions/NewsFeedActions';
import { News, NewsStatus } from '@/features/news/model/entities/News';


describe('NewsFeedAction', () => {
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

  it('resuelve con la lista de noticias cuando el gateway responde OK', async () => {
    const gatewayMock = {
      getNews: jest.fn().mockResolvedValue(sampleNews),
    };

    const action = NewsFeedAction(gatewayMock as any);

    const result = await action.getNews();

    expect(gatewayMock.getNews).toHaveBeenCalled();
    expect(result).toEqual(sampleNews);
  });

  it('rechaza con el error cuando el gateway lanza una excepción', async () => {
    const mockError = new Error('fail');
    const gatewayMock = {
      getNews: jest.fn().mockRejectedValue(mockError),
    };

    const action = NewsFeedAction(gatewayMock as any);

    await expect(action.getNews()).rejects.toThrow('fail');
    expect(gatewayMock.getNews).toHaveBeenCalled();
  });
}); 