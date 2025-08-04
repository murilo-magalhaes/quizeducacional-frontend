import { Abstract, emptyAbstract } from '@/interfaces/abstract.interface';
import { Content, emptyContent } from '@/interfaces/content.interface';

export interface Alternative extends Abstract {
  alternativeText: string;
  contentId: number;
  content?: Content;
}

export const emptyAlternative: Alternative = {
  ...emptyAbstract,
  alternativeText: '',
  contentId: 0,
  content: emptyContent,
};
