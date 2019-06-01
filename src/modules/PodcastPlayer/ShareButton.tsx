import { css } from 'emotion';
import { ShareIcon, ContentCutIcon } from 'mdi-react';
import * as React from 'react';
import Button, { ButtonProps } from 'src/components/Button';
import { colors } from 'src/styles';

const styles = {
  main: css({
    '&:disabled': {
      opacity: 0.3,
    },
    '& > svg': {
      marginLeft: 8,
    },
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    backgroundColor: colors.primary500,
    color: colors.gray20,
    padding: '0 20px',
    height: 42,
    transition: 'box-shadow 200ms ease-out, opacity 200ms ease-out',
  }),
};

const ShareButton: React.SFC<ButtonProps> = ({ className, ...props }) => (
  <Button {...props} className={css(styles.main, className)}>
    Create
    <ContentCutIcon size={16} />
  </Button>
);

export default ShareButton;
