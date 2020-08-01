import { ContentRepository, ContentRepositoryOptions, ContentElementResponse } from '.';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

const mockFetch = fetch as unknown as jest.Mock;

describe('Server Side Lib', () => {
  const mockResponse: ContentElementResponse = {
    total: 2,
    contentElements: [
      {
        content: 'theContent',
        contentElementId: 'contentElementId1',
        id: 'uniqueDBIdentifier1',
        locale: 'en_gb'
      },
      {
        content: 'theContent2',
        contentElementId: 'contentElementId2',
        id: 'uniqueDBIdentifier2',
        locale: 'en_gb'
      }
    ]
  };
  beforeEach(() => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse
    });
  });
  test('It should throw an error without an access key', () => {
    expect(() => new ContentRepository({} as ContentRepositoryOptions)).toThrowError('Please supply your accessKey in ContentRepositoryOptions.');
  });
  test('It should make a request for the users\'s content bundle with specified locale', async () => {
    const contentRepository = new ContentRepository({ accessKey: 'myAccessKey' });

    await contentRepository.getContentBundle('en_gb');

    expect(mockFetch).toHaveBeenCalledWith('https://test.url/api/v1/content?locale=en_gb&limit=100000', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer myAccessKey`
      }
    });
  });
  test('It should make two request for the users\'s content bundle with specified locales', async () => {
    const contentRepository = new ContentRepository({ accessKey: 'myAccessKey' });

    await contentRepository.getContentBundle('en_gb');
    await contentRepository.getContentBundle('en_us');

    expect(mockFetch).toHaveBeenCalledWith('https://test.url/api/v1/content?locale=en_gb&limit=100000', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer myAccessKey`
      }
    });
    expect(mockFetch).toHaveBeenCalledWith('https://test.url/api/v1/content?locale=en_us&limit=100000', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer myAccessKey`
      }
    });
  });
  test('It should make a request for the users\'s content bundle with a custom maxCount', async () => {
    const contentRepository = new ContentRepository({ accessKey: 'myAccessKey' });

    await contentRepository.getContentBundle('en_gb', { maxCount: 50 });

    expect(mockFetch).toHaveBeenCalledWith('https://test.url/api/v1/content?locale=en_gb&limit=50', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer myAccessKey`
      }
    });
  });
  test('It should return the users\'s content bundle', async () => {
    const contentRepository = new ContentRepository({ accessKey: 'myAccessKey' });

    expect(await contentRepository.getContentBundle('en_gb')).toMatchSnapshot();
  });
  test('It should not fetch the second time asking for the same locale', async () => {
    const contentRepository = new ContentRepository({ accessKey: 'myAccessKey' });
    await contentRepository.getContentBundle('en_gb');

    expect(await contentRepository.getContentBundle('en_gb')).toMatchSnapshot();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
