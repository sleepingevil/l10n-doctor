export interface ContentElement {
  contentElementId: string;
  locale: string;
  content: string;
}

export interface GetTextParams { [key: string]: string | number; }

export interface GetTextOptions {
  cId: string;
  params?: GetTextParams;
}

export class ContentBundle {
  private contentElements: ContentElement[];
  constructor(contentElements: ContentElement[]) {
    this.contentElements = contentElements;
  };
  getText(fallbackContent: string, options: GetTextOptions) {
    const contentElement = this.contentElements.find(ce => ce.contentElementId === options.cId);

    if (!contentElement) {
      // TODO: Collect all non-existant CE ids, so you can automatically generate a list
      console.warn(`Content element not found: ${options.cId}. Falling back to default content: "${fallbackContent}"`);
      return fallbackContent;
    }
    return contentElement.content;
  };
}
