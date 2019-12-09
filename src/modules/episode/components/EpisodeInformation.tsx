import React from 'react';
import { EpisodeState } from '../types';
import HttpContent from 'components/HttpContent';
import CalendarDayIcon from 'mdi-react/CalendarDayIcon';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import formatPublishDate from 'utils/formatPublishDate';
import ParagraphSkeleton from 'components/ParagraphSkeleton';
import formatMinutes from 'utils/formatMinutes';
import Attribute from 'components/Attribute';

type EpisodeInformationProps = {
  episodeMetadata: EpisodeState['metadata'];
};

const EpisodeInformation: React.FC<EpisodeInformationProps> = ({ episodeMetadata }) => (
  <HttpContent
    request={episodeMetadata}
    renderFetching={() => <ParagraphSkeleton />}
    renderSuccess={({ audioLength, published }) => (
      <div>
        <Attribute icon={<CalendarDayIcon />}>
          {`Published ${formatPublishDate(published)}`}
        </Attribute>
        <Attribute icon={<ClockOutlineIcon />}>{formatMinutes(audioLength)}</Attribute>
      </div>
    )}
  />
);

export default EpisodeInformation;
