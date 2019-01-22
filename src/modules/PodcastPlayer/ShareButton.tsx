import { css } from 'emotion';
import { ShareIcon } from 'mdi-react';
import * as React from 'react';
import Button, { ButtonProps } from '~/components/Button';
import { colors } from '~/styles';

const styles = {
  main: css({
    '&:disabled': {
      opacity: 0.3,
    },
    '&:hover': {
      '&:not(:disabled)': {
        boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
      },
    },
    '& > svg': {
      marginLeft: 4,
    },
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    backgroundColor: colors.primary,
    color: colors.lightest,
    padding: '9px 18px',
    transition: 'box-shadow 200ms ease-out, opacity 200ms ease-out',
  }),
};

const ShareButton: React.SFC<ButtonProps> = ({ className, ...props }) => (
  <Button {...props} className={css(styles.main, className)}>
    Share!
    <ShareIcon />
  </Button>
);

export default ShareButton;
