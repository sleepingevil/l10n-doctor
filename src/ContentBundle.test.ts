import { ContentBundle, ContentElement } from './ContentBundle';

describe('ContentBundle', () => {
  const contentElements: ContentElement[] = [
    {
      content: 'content1',
      contentElementId: 'contentElementId1',
      id: 'uniqueDBIdentifier1',
      locale: 'en_gb'
    },
    {
      content: 'content2',
      contentElementId: 'contentElementId2',
      id: 'uniqueDBIdentifier2',
      locale: 'en_gb'
    }
  ];

  contentElements.forEach(contentElement => test(`It should return content for ${contentElement.contentElementId}`, () => {
    const contentBundle = new ContentBundle(contentElements);

    expect(contentBundle.getText('fallbackContent', { cId: contentElement.contentElementId })).toBe(contentElement.content);
  }));

  beforeAll(() => {
    jest.spyOn(console, 'warn');
  });

  test('If contentElement does not exist, it should return fallback content, and warn client', () => {
    const contentBundle = new ContentBundle(contentElements);

    expect(contentBundle.getText('fallbackContent', { cId: 'IDontExist' })).toBe('fallbackContent');
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith('Content element not found: IDontExist. Falling back to default content: "fallbackContent"');
  });
});
