import * as React from 'react';
import Button, { ButtonProps } from '~/components/Button';
import { css } from 'emotion';
import { colors, borderRadius } from '~/styles';
import { PlayCircleIcon, CancelIcon, StopCircleIcon } from 'mdi-react';

type PreviewButtonProps = ButtonProps & {
  previewing: boolean;
};

const styles = {
  main: css({
    '&:disabled': {
      opacity: 0.5,
    },
    border: `1px solid ${colors.dark}`,
    fontWeight: 'bold',
    color: colors.dark,
    height: 42,
    borderRadius: 8,
    padding: '0 20px',
  }),
  icon: css({
    marginLeft: 8,
  }),
};

const PreviewButton: React.FC<PreviewButtonProps> = ({ previewing, ...props }) => (
  <Button className={styles.main} {...props}>
    {previewing ? 'Previewing...' : 'Preview'}
    {previewing ? (
      <StopCircleIcon className={styles.icon} size={20} />
    ) : (
      <PlayCircleIcon className={styles.icon} size={20} />
    )}
  </Button>
);

export default PreviewButton;
