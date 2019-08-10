import * as React from 'react';
import { css } from 'emotion';
import { fonts, colors } from 'src/styles';

type CharacterCounterProps = {
  className?: string;
  max: number;
  text: string;
};

const styles = {
  main: css(fonts.text200, {
    color: colors.gray700,
  }),
  overLimit: css({
    color: colors.red,
  }),
};

const CharacterCounter: React.FC<CharacterCounterProps> = ({ className, max, text }) => {
  const numChars = text.length;

  return (
    <div
      className={css(styles.main, numChars > max && styles.overLimit, className)}
      title={`Character limit: ${numChars}/${max}`}
    >
      {numChars}/{max}
    </div>
  );
};

export default CharacterCounter;