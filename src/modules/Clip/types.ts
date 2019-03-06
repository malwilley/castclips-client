import { GetClipResponse } from '~/api/firebase';
import { HttpRequest } from '~/types';

export type ClipMetadata = {
  audio: string;
  description: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: string;
  };
  podcast: { id: string; title: string; description: string; thumbnail: string };
  published: Date;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type ClipState = {
  metadata: HttpRequest<ClipMetadata>;
};
