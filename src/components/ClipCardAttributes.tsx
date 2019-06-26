import * as React from 'react';
import { ClipMetadata } from 'src/modules/clip/types';
import { css } from 'emotion';
import { fonts } from 'src/styles';
import { HeartIcon, CalendarDayIcon } from 'mdi-react';
import formatClipAge from 'src/utils/formatClipAge';
import Timestamp from './Timestamp';

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
        {formatClipAge(published)}
      </span>
    </div>
    <Timestamp seconds={end - start} />
  </div>
);

export default ClipCardAttributes;
