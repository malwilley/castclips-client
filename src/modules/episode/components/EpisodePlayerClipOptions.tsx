import * as React from 'react';
import Show from 'src/components/Show';
import ClipPreview from './ClipPreview';
import TimeRecorder from './TimeRecorder';
import { css } from 'emotion';
import { colors } from 'src/styles';
import { isNil } from 'ramda';
import PreviewButton from './PreviewButton';
import { ArrowRightIcon } from 'mdi-react';
import CreateClipModal from './CreateClipModal';
import ShareButton from './ShareButton';
import ShowHideClipOptions from './ShowHideClipOptions';

type EpisodePlayerClipOptionsProps = {
  start: Maybe<number>;
  end: Maybe<number>;
  time: number;
  duration: number;
  handleSetStart: (time: number) => void;
  handleSetEnd: (time: number) => void;
  previewing: boolean;
  handlePreviewStart: () => void;
  handlePreviewStop: () => void;
};

const styles = {
  buttonsContainer: css({
    '& > :not(:last-child)': {
      marginRight: 16,
    },
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 16,
  }),
  timespanContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: '0 16px',
  }),
  timespanRangeIcon: css({
    color: colors.gray200,
    flexBasis: 50,
    textAlign: 'center',
    flexShrink: 1,
  }),
};

const EpisodePlayerClipOptions: React.FC<EpisodePlayerClipOptionsProps> = ({
  end,
  start,
  duration,
  handlePreviewStart,
  handlePreviewStop,
  handleSetEnd,
  handleSetStart,
  previewing,
  time,
}) => {
  const clipBoundsSet = !isNil(start) && !isNil(end);

  return (
    <Show>
      {({ isOpen, toggle }) => (
        <>
          {isOpen && (
            <>
              <ClipPreview start={start} end={end} time={time} length={duration} />
              <div className={styles.timespanContainer}>
                <TimeRecorder
                  currentTime={time}
                  time={start}
                  handleRecordClick={handleSetStart}
                  placeholder="Start time"
                />
                <ArrowRightIcon className={styles.timespanRangeIcon} size={16} />
                <TimeRecorder
                  currentTime={time}
                  time={end}
                  handleRecordClick={handleSetEnd}
                  placeholder="End time"
                />
              </div>
              <div className={styles.buttonsContainer}>
                <PreviewButton
                  active={clipBoundsSet}
                  onClick={previewing ? handlePreviewStop : handlePreviewStart}
                  previewing={previewing}
                />
                <Show>
                  {({ isOpen: modalIsOpen, toggle: toggleModal }) => (
                    <>
                      {modalIsOpen && clipBoundsSet && (
                        <CreateClipModal start={start!} end={end!} handleClose={toggleModal} />
                      )}
                      <ShareButton active={clipBoundsSet} onClick={toggleModal} />
                    </>
                  )}
                </Show>
              </div>
            </>
          )}
          <ShowHideClipOptions onClick={toggle} show={isOpen} />
        </>
      )}
    </Show>
  );
};

export default EpisodePlayerClipOptions;
