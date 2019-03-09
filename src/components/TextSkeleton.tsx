import * as React from 'react';
import { colors } from '~/styles';
import { css } from 'emotion';
import { CSSObject } from 'create-emotion';

type TextSkeletonProps = {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
  marginBottom?: number;
};

const styles = {
  main: (style: CSSObject) =>
    css({
      borderRadius: 8,
      ...style,
    }),
};

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  className,
  color = colors.gray300,
  height = 12,
  marginBottom = 4,
  width,
}) => (
  <div
    className={css(styles.main({ backgroundColor: color, height, marginBottom, width }), className)}
  />
);

export default TextSkeleton;
