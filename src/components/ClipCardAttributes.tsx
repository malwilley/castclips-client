import * as React from 'react';
import { ClipMetadata } from 'src/modules/clip/types';
import { css } from 'emotion';
import { fonts } from 'src/styles';
import HeartIcon from 'mdi-react/HeartIcon';
import CalendarDayIcon from 'mdi-react/CalendarDayIcon';
import formatClipAge from 'src/utils/formatClipAge';
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import Timestamp from './Timestamp';
import TextSkeleton from './TextSkeleton';

type ClipCardAttributesProps = {
  className?: string;
  clip: ClipMetadata;
};

const styles = {
  main: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  leftContainer: css({
    display: 'flex',
  }),
  iconText: css(fonts.attribute300),
};

const ClipCardAttributesSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={css(styles.main, className)}>
    <TextSkeleton height="1em" width={120} />
    <TextSkeleton height="1em" width={45} />
  </div>
);

const ClipCardAttributes: React.FC<ClipCardAttributesProps> = ({
  className,
  clip: { end, start, likesCount, published },
}) => (
  <div className={css(styles.main, className)}>
    <div className={styles.leftContainer}>
      <span className={styles.iconText}>
        <HeartIcon />
        {likesCount}
      </span>
      <span className={styles.iconText}>
        <CalendarDayIcon />
        {capitalizeFirstLetter(formatClipAge(published))}
      </span>
    </div>
    <Timestamp seconds={end - start} />
  </div>
);

export { ClipCardAttributesSkeleton };
export default ClipCardAttributes;
