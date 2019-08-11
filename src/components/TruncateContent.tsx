import React, { useState } from 'react';
import { css } from 'emotion';
import Button from './Button';
import useResizeObserver from 'src/hooks/useResizeObserver';
import { colors, fonts, clickable } from 'src/styles';

type TruncateContentProps = {
  className?: string;
  maxHeight?: number;
  expandable?: boolean;
};

const styles = {
  main: css({
    overflow: 'hidden',
    position: 'relative',
  }),
  padBottom: css({
    paddingBottom: '3em',
  }),
  seeMoreContainer: (expandable: boolean) =>
    css({
      display: 'flex',
      alignItems: 'flex-end',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: expandable ? '3em' : '2em',
      background: expandable
        ? 'linear-gradient(to top, white 1.5em, transparent)'
        : 'linear-gradient(to top, white, transparent)',
    }),
  seeMoreButton: css(fonts.bold200, clickable, {
    color: colors.gray700,
  }),
};

const TruncateContent: React.FC<TruncateContentProps> = ({
  className,
  children,
  expandable = false,
  maxHeight = 200,
}) => {
  const [open, setOpen] = useState(false);
  const {
    ref,
    dimensions: { height },
  } = useResizeObserver<HTMLDivElement>();
  const needsTruncation = height > maxHeight;

  return (
    <div
      className={css(styles.main, needsTruncation && styles.padBottom, className)}
      style={{ maxHeight: open ? 'none' : maxHeight }}
    >
      <div ref={ref}>{children}</div>
      {needsTruncation && (
        <div className={styles.seeMoreContainer(expandable)}>
          {expandable && (
            <Button className={styles.seeMoreButton} onClick={() => setOpen(!open)}>
              See {open ? 'less' : 'more'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TruncateContent;
