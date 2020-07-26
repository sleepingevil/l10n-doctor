import fetch from 'cross-fetch';
import { ContentBundle } from './ContentBundle';

export interface ContentRepositoryOptions {
  accessKey: string;
  // projectId: String; TODO: implement projects first
}

export interface ContentRepository {
  getContentBundle: (locale: string) => ContentBundle;
}

export default async (options: ContentRepositoryOptions): Promise<ContentRepository> => {
  if (!options.accessKey) {
    throw new Error('Please supply your accessKey in ContentRepositoryOptions.');
  }
  console.log(L10NDR_URL || 'AHAHAHA')
  await fetch(`${L10NDR_URL}/api/v1/content`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${options.accessKey}`
    }
  });

  return {
    getContentBundle: (locale: string) => new ContentBundle([])
  };
};