import { GetClipResponse } from '~/api/firebase';
import { HttpRequest } from '~/types';

export type ClipMetadata = GetClipResponse;

export type ClipState = {
  metadata: HttpRequest<ClipMetadata>;
};
