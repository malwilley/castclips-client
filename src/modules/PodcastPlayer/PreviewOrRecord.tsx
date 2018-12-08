import { css } from 'emotion';
import {
  DeleteIcon,
  MicrophoneIcon,
  MicrophoneOutlineIcon,
  PlayCircleFilledIcon,
  StopCircleIcon,
} from 'mdi-react';
import * as React from 'react';
import Button from '~/components/Button';
import { colors } from '~/styles';

type PreviewOrRecordProps = {
  canPreview: boolean;
  onPreviewStart: () => void;
  onPreviewStop: () => void;
  onRecordStart: () => void;
  onRecordStop: () => void;
  onReset: () => void;
  previewing: boolean;
  recording: boolean;
};

const styles = {
  button: css({
    '&:disabled': {
      opacity: 0.3,
    },
    '& > svg': {
      fill: colors.dark,
      height: 40,
      width: 40,
    },
    marginRight: 20,
  }),
};

const PreviewOrRecord: React.SFC<PreviewOrRecordProps> = ({
  canPreview,
  onPreviewStart,
  onPreviewStop,
  onRecordStart,
  onRecordStop,
  onReset,
  previewing,
  recording,
}) => {
  if (previewing) {
    return (
      <Button className={styles.button} onClick={onPreviewStop}>
        <StopCircleIcon />
      </Button>
    );
  }
  if (recording) {
    return (
      <Button className={styles.button} onClick={onRecordStop}>
        <MicrophoneOutlineIcon />
      </Button>
    );
  }
  if (canPreview) {
    return (
      <div>
        <Button className={styles.button} onClick={onPreviewStart}>
          <PlayCircleFilledIcon />
        </Button>
        <Button className={styles.button} onClick={onReset}>
          <DeleteIcon />
        </Button>
      </div>
    );
  }
  return (
    <Button className={styles.button} onClick={onRecordStart}>
      <MicrophoneIcon />
    </Button>
  );
};

export default PreviewOrRecord;
