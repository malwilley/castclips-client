import * as React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'mdi-react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';

type TextPointerProps = {
  direction: 'up' | 'down';
};

const styles = {
  main: css(fonts.text300, {
    color: colors.secondary50,
    textAlign: 'center',
  }),
};

const TextPointer: React.FC<TextPointerProps> = ({ direction, children }) => (
  <div className={styles.main}>
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
