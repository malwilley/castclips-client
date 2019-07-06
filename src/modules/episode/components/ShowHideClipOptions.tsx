import * as React from 'react';
import Button, { ButtonProps } from 'src/components/Button';
import { css } from 'emotion';
import { colors } from 'src/styles';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';

type ShowHideClipOptionsProps = ButtonProps & {
  show: boolean;
};

const styles = {
  show: css({
    '&:hover': {
      backgroundColor: colors.secondary50,
    },
    backgroundColor: colors.secondary20,
    color: colors.primary500,
    padding: '12px 20px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    margin: '40px auto 0 auto',
    transition: '100ms background-color ease-out',
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

const HideClipOptions: React.FC<ButtonProps> = props => (
  <Button className={styles.show} {...props}>
    Hide clip options <ChevronUpIcon className={styles.icon} size={20} />
  </Button>
);

const ShowHideClipOptions: React.FC<ShowHideClipOptionsProps> = ({ show, ...props }) =>
  show ? <HideClipOptions {...props} /> : <ShowClipOptions {...props} />;

export default ShowHideClipOptions;
