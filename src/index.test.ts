import getContentRepository, { ContentRepositoryOptions } from '.';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

const mockFetch = fetch as unknown as jest.Mock;

describe('Server Side Lib', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({})
    });
  });
  test('It should throw an error without an access key', () => {
    expect(getContentRepository({} as ContentRepositoryOptions)).rejects.toEqual(new Error('Please supply your accessKey in ContentRepositoryOptions.'));
  });
  test('It should make a request for the users\'s content bundle', async () => {
    await getContentRepository({ accessKey: 'myAccessKey' });
    expect(mockFetch).toHaveBeenCalledWith('https://test.url/api/v1/content', {
      method: 'GET',
      headers: {
        Authorization: `Bearer myAccessKey`
      }
    });
  });
});
