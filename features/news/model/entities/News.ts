export enum NewsStatus {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    ARCHIVED = 'archived'
}

export interface News {
    id: number;
    slug: string;
    url: string;
    title: string;
    content: string;
    image: string;
    thumbnail: string;
    status: NewsStatus;
    category: string;
    publishedAt: string;
    updatedAt: string;
    userId: number;
}
