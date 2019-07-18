import React from 'react';
import { css } from 'emotion';
import Card from 'src/components/Card';
import CopyLink from 'src/components/CopyLink';
import HttpContent from 'src/components/HttpContent';
import { ClipState } from '../types';
import { colors } from 'src/styles';
import { RedditIcon, FacebookIcon, TwitterIcon, EyeOutlineIcon, CalendarDayIcon } from 'mdi-react';
import SectionHeader from 'src/components/SectionHeader';
import ClipContext from './ClipContext';
import TruncateContent from 'src/components/TruncateContent';
import Attribute from 'src/components/Attribute';
import ParagraphSkeleton from 'src/components/ParagraphSkeleton';
import AccessibleLabel from 'src/components/AccessibleLabel';
import Tooltip from 'src/components/Tooltip';
import formatClipAge from 'src/utils/formatClipAge';

type ClipPageBodyProps = {
  clipId: string;
  clipMetadata: ClipState['metadata'];
};

const styles = {
  description: css({
    margin: 0,
    whiteSpace: 'pre-wrap',
  }),
  descriptionContainer: css({
    margin: '10px 0 40px 0',
  }),
  main: css({
    '@media (max-width: 800px)': {
      gridTemplateColumns: '[main] 1fr',
    },
    display: 'grid',
    gridTemplateColumns: '[main] 1fr [side] 300px',
    gridColumnGap: 40,
    gridRowGap: 40,
  }),
  mainContainer: css({
    gridTemplateAreas: 'main',
  }),
  sideContainer: css({
    gridTemplateAreas: 'side',
  }),
  userCard: css({
    padding: 20,
    marginBottom: 40,
  }),
  userPicNameContainer: css({
    display: 'flex',
    alignItems: 'center',
  }),
  userPic: css({
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.secondary50,
    color: colors.secondary500,
    borderRadius: '50%',
    marginRight: 20,
  }),
  userPublished: css({
    fontSize: 14,
    color: colors.gray200,
    margin: 0,
  }),
  shareCard: css({
    '& > :not(:last-child)': {
      marginBottom: 20,
    },
    padding: 20,
  }),
  shareButtons: css({
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    display: 'flex',
    justifyContent: 'center',
  }),
  shareButton: css({
    alignItems: 'center',
    borderRadius: '50%',
    color: colors.white,
    display: 'flex',
    height: '2rem',
    justifyContent: 'center',
    width: '2rem',
  }),
  shareButtonFacebook: css({
    backgroundColor: '#3C5A99',
  }),
  shareButtonReddit: css({
    backgroundColor: '#ff4500',
  }),
  shareButtonTwitter: css({
    backgroundColor: '#1DA1F2',
  }),
};

const ClipPageBody: React.FC<ClipPageBodyProps> = ({ clipId, clipMetadata }) => {
  const link = `https://castclips.com/clip/${clipId}`;
  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <HttpContent
          request={clipMetadata}
          renderFetching={() => (
            <div>
              <SectionHeader>description</SectionHeader>
              <ParagraphSkeleton />
            </div>
          )}
          renderSuccess={clip => (
            <div>
              {clip.description && (
                <>
                  <SectionHeader>description</SectionHeader>
                  <TruncateContent className={styles.descriptionContainer} expandable>
                    <p className={styles.description}>{clip.description}</p>
                  </TruncateContent>
                </>
              )}
              <ClipContext clip={clip} />
            </div>
          )}
        />
      </div>
      <div className={styles.sideContainer}>
        <SectionHeader>clip information</SectionHeader>
        <HttpContent
          request={clipMetadata}
          renderFetching={() => <ParagraphSkeleton />}
          renderSuccess={({ createdAt, views }) => (
            <>
              <Attribute icon={<EyeOutlineIcon />}>{views} views</Attribute>
              <Attribute icon={<CalendarDayIcon />}>Created {formatClipAge(createdAt)}</Attribute>
            </>
          )}
        />
        <SectionHeader>tell the world</SectionHeader>
        <Card className={styles.shareCard}>
          <CopyLink text={link} />
          <div className={styles.shareButtons}>
            <Tooltip text="Share to reddit">
              <a
                aria-labelledby="reddit-label"
                className={css(styles.shareButton, styles.shareButtonReddit)}
                href={
                  clipMetadata.type === 'success'
                    ? `https://reddit.com/submit?url=${link}&title=${encodeURIComponent(
                        clipMetadata.data.title
                      )}`
                    : `https://reddit.com/submit?url=${link}`
                }
                target="__blank"
              >
                <AccessibleLabel id="reddit-label">Share to reddit</AccessibleLabel>
                <RedditIcon size={20} />
              </a>
            </Tooltip>
            <Tooltip text="Share to Twitter">
              <a
                aria-labelledby="twitter-label"
                className={css(styles.shareButton, styles.shareButtonTwitter)}
                href={
                  clipMetadata.type === 'success'
                    ? `https://twitter.com/intent/tweet?url=${link}&text=${encodeURIComponent(
                        clipMetadata.data.title
                      )}`
                    : `https://twitter.com/intent/tweet?url=${link}`
                }
                target="__blank"
              >
                <AccessibleLabel id="twitter-label">Share to Twitter</AccessibleLabel>
                <TwitterIcon size={20} />
              </a>
            </Tooltip>
            <Tooltip text="Share to Facebook">
              <a
                aria-labelledby="facebook-label"
                className={css(styles.shareButton, styles.shareButtonFacebook)}
                href={`https://www.facebook.com/sharer.php?u=${link}`}
                target="__blank"
              >
                <AccessibleLabel id="facebook-label">Share to Facebook</AccessibleLabel>
                <FacebookIcon size={20} />
              </a>
            </Tooltip>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClipPageBody;
