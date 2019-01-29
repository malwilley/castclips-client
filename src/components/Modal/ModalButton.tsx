import * as React from 'react';
import { css } from 'emotion';
import { colors, fontFamily } from '~/styles';
import { CSSObject } from 'create-emotion';
import Button, { ButtonProps } from '~/components/Button';

type ModalButtonProps = ButtonProps & {
  text: string;
  type: 'primary' | 'secondary';
};

const commonStyles: CSSObject = {
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  '&:not(:disabled)': {
    '&:hover': {
      boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
    },
  },
  borderRadius: 4,
  padding: '10px 16px',
  fontSize: 16,
  fontWeight: 'bold',
  fontFamily: fontFamily.titleFont,
  minWidth: 90,
};

const makeStyles = (type: ModalButtonProps['type']) => {
  switch (type) {
    case 'primary':
      return {
        ...commonStyles,
        '&:not(:disabled)': {
          '&:active': {
            backgroundColor: colors.primaryDark,
          },
        },
        backgroundColor: colors.primary,
        color: colors.light,
      };
    case 'secondary': {
      return {
        ...commonStyles,
        backgroundColor: colors.lightest,
        color: colors.gray,
        border: `1px solid ${colors.gray}`,
      };
    }
    default:
      return {};
  }
};

const ModalButton: React.SFC<ModalButtonProps> = ({
  children,
  className,
  onClick,
  text,
  type,
  ...buttonProps
}) => (
  <Button className={css(className, makeStyles(type))} {...buttonProps}>
    {text}
  </Button>
);

export { ModalButtonProps };
export default ModalButton;
