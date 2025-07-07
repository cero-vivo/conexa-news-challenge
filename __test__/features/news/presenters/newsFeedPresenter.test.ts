import { NewsFeedPresenter } from '../../../../features/news/infrastructure/presenters/NewsFeedPresenter';
import { INewsFeedAction } from '../../../../features/news/model/actions/NewsFeedActions';
import { News, NewsStatus } from '../../../../features/news/model/entities/News';

describe('NewsFeedPresenter', () => {
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

  it('debe invocar getNewsSuccess cuando la acción responde OK', async () => {
    const actionMock: INewsFeedAction = {
      getNews: jest.fn().mockResolvedValue(sampleNews),
    } as INewsFeedAction;

    const screenMock = {
      getNewsSuccess: jest.fn(),
      getNewsError: jest.fn(),
    };

    const presenter = NewsFeedPresenter(actionMock, screenMock);

    await presenter.getNews();

    expect(screenMock.getNewsSuccess).toHaveBeenCalledWith(sampleNews);
    expect(screenMock.getNewsError).not.toHaveBeenCalled();
  });

  it('debe invocar getNewsError cuando la acción lanza error', async () => {
    const mockError = new Error('fail');
    const actionMock: INewsFeedAction = {
      getNews: jest.fn().mockRejectedValue(mockError),
    } as INewsFeedAction;

    const screenMock = {
      getNewsSuccess: jest.fn(),
      getNewsError: jest.fn(),
    };

    const presenter = NewsFeedPresenter(actionMock, screenMock);

    await presenter.getNews();

    expect(screenMock.getNewsError).toHaveBeenCalledWith(mockError);
    expect(screenMock.getNewsSuccess).not.toHaveBeenCalled();
  });
}); 