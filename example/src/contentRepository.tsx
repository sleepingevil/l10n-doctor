import { ContentRepository } from 'l10n-doctor';

const contentRepository = new ContentRepository({ accessKey: process.env.REACT_APP_L10NDR_TOKEN || '' });
export const getContentBundle = async (locale: string) => await contentRepository.getContentBundle(locale);
