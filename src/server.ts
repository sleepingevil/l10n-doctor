require("@babel/register")({ extensions: ['.js', '.ts'] });

import { ContentBundle } from './ContentBundle';

interface ContentRepositoryOptions {
  accessKey: string;
  // projectId: String; TODO: implement projects first
}

interface ContentRepository {
  getContentBundle: (locale: string) => ContentBundle;
}

module.exports = (options: ContentRepositoryOptions): ContentRepository => {
  if (!options.accessKey) {
    throw new Error('Please supply your accessKey in ContentRepositoryOptions.');
  }

  // TODO: Fetch content bundle here from server

  return {
    getContentBundle: (locale: string) => new ContentBundle([])
  };
};