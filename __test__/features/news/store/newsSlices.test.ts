import { News, NewsStatus } from '@/features/news/model/entities/News';
import newsReducer, { clearError, clearSelectedNews, setSelectedNews } from '@/features/news/store/newsSlice';
import savedNewsReducer, { clearSavedNews, toggleSaveNews } from '@/features/news/store/savedNewsSlice';

describe('newsSlice', () => {
  const initialState = undefined; // Reducer manejará el estado inicial
  const sampleNews: News = {
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
  };

  it('setSelectedNews guarda la noticia seleccionada', () => {
    const state = newsReducer(initialState as any, setSelectedNews(sampleNews));
    expect(state.selectedNews).toEqual(sampleNews);
  });

  it('clearSelectedNews limpia la noticia seleccionada', () => {
    const populatedState = newsReducer(initialState as any, setSelectedNews(sampleNews));
    const clearedState = newsReducer(populatedState, clearSelectedNews());
    expect(clearedState.selectedNews).toBeNull();
  });

  it('clearError limpia el error', () => {
    const stateWithError = {
      news: [],
      selectedNews: null,
      loading: 'idle',
      error: 'Error',
    } as any;
    const clearedState = newsReducer(stateWithError, clearError());
    expect(clearedState.error).toBeNull();
  });
});

describe('savedNewsSlice', () => {
  const sampleNews: News = {
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
  };

  it('toggleSaveNews añade una noticia nueva', () => {
    const state = savedNewsReducer(undefined, toggleSaveNews(sampleNews));
    expect(state.savedNews).toEqual([sampleNews]);
  });

  it('toggleSaveNews elimina una noticia existente', () => {
    const stateWithNews = savedNewsReducer(undefined, toggleSaveNews(sampleNews));
    const stateAfterToggle = savedNewsReducer(stateWithNews, toggleSaveNews(sampleNews));
    expect(stateAfterToggle.savedNews).toEqual([]);
  });

  it('clearSavedNews vacía el arreglo de guardados', () => {
    const stateWithNews = savedNewsReducer(undefined, toggleSaveNews(sampleNews));
    const clearedState = savedNewsReducer(stateWithNews, clearSavedNews());
    expect(clearedState.savedNews).toEqual([]);
  });
}); 