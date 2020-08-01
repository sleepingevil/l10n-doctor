declare const L10NDR_URL: string;

import fetch from 'cross-fetch';
import { ContentBundle, ContentElement } from './ContentBundle';

export interface ContentRepositoryOptions {
  accessKey: string;
  // projectId: String; TODO: implement projects first
}

export interface ContentElementResponse {
  contentElements: ContentElement[],
  total: number;
}

class ContentRepository {
  private accessKey: string;
  private contentRequests: Record<string, Promise<ContentBundle>>;

  constructor(options: ContentRepositoryOptions) {
    if (!options.accessKey) {
      throw new Error('Please supply your accessKey in ContentRepositoryOptions.');
    }
    this.accessKey = options.accessKey;
    this.contentRequests = {};
  }

  async getContentBundle(locale: string, options: { maxCount: number } = { maxCount: 100000 }) {
    if (!this.contentRequests[locale]) {
      const response = fetch(`${L10NDR_URL}/api/v1/content?locale=${locale}&limit=${options.maxCount}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        },
        mode: 'cors',
      });

      this.contentRequests[locale] = response
        .then(async response => new ContentBundle((await response.json() as ContentElementResponse).contentElements));
    }

    return await this.contentRequests[locale];
  }
}

export { ContentBundle, ContentRepository };