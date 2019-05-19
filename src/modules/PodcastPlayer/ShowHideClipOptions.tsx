import * as React from 'react';
import Button, { ButtonProps } from '~/components/Button';
import { css } from 'emotion';
import { colors } from '~/styles';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';

type ShowHideClipOptionsProps = ButtonProps & {
  show: boolean;
};

const styles = {
  main: css({
    '&:hover': {
      backgroundColor: '#f8faff',
    },
    width: '100%',
    height: 42,
    color: colors.gray600,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  }),
  show: css({
    '&:hover': {
      backgroundColor: colors.secondary50,
    },
    backgroundColor: colors.secondary20,
    color: colors.secondary500,
    padding: '12px 20px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    margin: '40px auto 0 auto',
    transition: '200ms background-color ease-out',
  }),
  icon: css({
    marginLeft: 8,
  }),
};

const ShowClipOptions: React.FC<ButtonProps> = props => (
  <Button className={styles.show} {...props}>
    Create a clip <ChevronDownIcon className={styles.icon} size={20} />
  </Button>
);

const ShowHideClipOptions: React.FC<ShowHideClipOptionsProps> = ({ show, ...props }) =>
  show ? (
    <Button className={styles.main} {...props}>
      Hide clip options
      <ChevronUpIcon className={styles.icon} size={20} />
    </Button>
  ) : (
    <ShowClipOptions {...props} />
  );

export default ShowHideClipOptions;
