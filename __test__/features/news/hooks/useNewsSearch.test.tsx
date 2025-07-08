// @ts-nocheck
import { News, NewsStatus } from '@/features/news/model/entities/News';
import { useNewsSearch } from '@/features/news/view/news-feed/hooks/useNewsSearch';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

describe('useNewsSearch', () => {
  const mockNews: News[] = [
    {
      id: 1,
      slug: 'post-1',
      url: 'https://example.com/1',
      title: 'Apple releases new iPhone',
      content: '',
      image: '',
      thumbnail: '',
      status: NewsStatus.PUBLISHED,
      category: 'tech',
      publishedAt: '',
      updatedAt: '',
      userId: 1,
    },
    {
      id: 2,
      slug: 'post-2',
      url: 'https://example.com/2',
      title: 'Microsoft launches Surface',
      content: '',
      image: '',
      thumbnail: '',
      status: NewsStatus.PUBLISHED,
      category: 'tech',
      publishedAt: '',
      updatedAt: '',
      userId: 1,
    },
    {
      id: 3,
      slug: 'post-3',
      url: 'https://example.com/3',
      title: 'Economy grows in Q1',
      content: '',
      image: '',
      thumbnail: '',
      status: NewsStatus.PUBLISHED,
      category: 'finance',
      publishedAt: '',
      updatedAt: '',
      userId: 1,
    },
  ];

  function setupHook() {
    const resultRef: { current: any } = { current: null };
    const TestComponent: React.FC = () => {
      resultRef.current = useNewsSearch(mockNews);
      return null;
    };
    act(() => {
      renderer.create(<TestComponent />);
    });
    return resultRef;
  }

  it('devuelve la lista completa cuando la búsqueda está vacía', () => {
    const ref = setupHook();
    expect(ref.current.filteredNews.length).toBe(3);
  });

  it('filtra resultados cuando se ingresa una palabra', async () => {
    const ref = setupHook();

    await act(async () => {
      ref.current.handleSearch('Apple');
    });

    expect(ref.current.filteredNews.length).toBe(1);
    expect(ref.current.filteredNews[0].title).toContain('Apple');
  });

  it('filtra con lógica AND para múltiples palabras', async () => {
    const ref = setupHook();

    await act(async () => {
      ref.current.handleSearch('new iPhone');
    });

    expect(ref.current.filteredNews.length).toBe(1);
  });

  it('handleClear limpia la búsqueda', async () => {
    const ref = setupHook();

    await act(async () => {
      ref.current.handleSearch('Surface');
    });

    expect(ref.current.filteredNews.length).toBe(1);

    await act(async () => {
      ref.current.handleClear();
    });

    expect(ref.current.filteredNews.length).toBe(3);
  });
}); 