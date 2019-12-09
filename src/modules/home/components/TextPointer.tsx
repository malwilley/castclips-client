import * as React from 'react';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import { css } from 'emotion';
import { colors, fonts } from 'styles';

type TextPointerProps = {
  className?: string;
  direction: 'up' | 'down';
};

const styles = {
  main: css(fonts.text300, {
    color: colors.secondary50,
    textAlign: 'center',
  }),
};

const TextPointer: React.FC<TextPointerProps> = ({ className, direction, children }) => (
  <div className={css(styles.main, className)}>
    {direction === 'up' && (
      <div>
        <ArrowUpIcon size={20} />
      </div>
    )}
    <div>{children}</div>
    {direction === 'down' && (
      <div>
        <ArrowDownIcon size={20} />
      </div>
    )}
  </div>
);

export default TextPointer;
