import * as React from 'react';
import { colors } from 'styles';
import { css } from 'emotion';
import { CSSObject } from 'create-emotion';

type TextSkeletonProps = {
  className?: string;
  color?: string;
  height?: number | string;
  width?: number | string;
  marginBottom?: number | string;
};

const styles = {
  main: (style: CSSObject) =>
    css({
      borderRadius: 4,
      ...style,
    }),
};

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  className,
  color = colors.gray50,
  height = 12,
  marginBottom = 4,
  width,
}) => (
  <div
    className={css(styles.main({ backgroundColor: color, height, marginBottom, width }), className)}
  />
);

export default TextSkeleton;
