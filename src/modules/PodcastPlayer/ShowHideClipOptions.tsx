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
    color: colors.dark,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  }),
  show: css({
    backgroundColor: colors.primary,
    color: colors.lightest,
    padding: 8,
    borderRadius: 8,
  }),
  icon: css({
    marginLeft: 8,
  }),
};

const ShowHideClipOptions: React.FC<ShowHideClipOptionsProps> = ({ show, ...props }) => (
  <Button className={styles.main} {...props}>
    {show ? 'Hide clip options' : <div className={styles.show}>Show clip options</div>}
    {show ? (
      <ChevronUpIcon className={styles.icon} size={20} />
    ) : (
      <ChevronDownIcon className={styles.icon} size={20} />
    )}
  </Button>
);

export default ShowHideClipOptions;
