import * as React from 'react';
import { css } from 'emotion';
import Card from '~/components/Card';
import CopyLink from '~/components/CopyLink';
import HttpContent from '~/components/HttpContent';
import { ClipState } from '../types';
import { colors } from '~/styles';
import { RedditIcon, FacebookIcon, TwitterIcon, UserOutlineIcon } from 'mdi-react';
import SectionHeader from '~/components/SectionHeader';
import ClipContext from './ClipContext';
import TextSkeleton from '~/components/TextSkeleton';

type ClipPageBodyProps = {
  clipId: string;
  clipMetadata: ClipState['metadata'];
};

const styles = {
  description: css({
    margin: '10px 0 40px 0',
  }),
  main: css({
    display: 'grid',
    gridTemplateColumns: '[main] 1fr [side] 300px',
    gridColumnGap: 40,
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
    background: colors.primaryAlpha30,
    color: colors.primary500,
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
    '&:hover': {
      boxShadow: 'var(--modal-dropshadow)',
    },
    alignItems: 'center',
    borderRadius: '50%',
    color: colors.lightest,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    width: 30,
    transition: 'box-shadow 300ms ease-out',
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
              <TextSkeleton height={20} width={100} color={colors.gray50} />
              <TextSkeleton height={20} width={300} color={colors.gray50} />
              <TextSkeleton height={20} width={200} color={colors.gray50} />
            </div>
          )}
          renderSuccess={clip => (
            <div>
              {clip.description && (
                <>
                  <SectionHeader>description</SectionHeader>
                  <p className={styles.description}>{clip.description}</p>
                </>
              )}
              <ClipContext clip={clip} />
            </div>
          )}
        />
      </div>
      <div className={styles.sideContainer}>
        <SectionHeader>clip creator</SectionHeader>
        <Card className={styles.userCard}>
          <div className={styles.userPicNameContainer}>
            <div className={styles.userPic}>
              <UserOutlineIcon />
            </div>
            <HttpContent
              request={clipMetadata}
              renderSuccess={data => (
                <div>
                  <h4>username</h4>
                  <h5
                    className={styles.userPublished}
                  >{`Created ${data.published.toLocaleDateString()}`}</h5>
                </div>
              )}
            />
          </div>
        </Card>
        <SectionHeader>tell the world</SectionHeader>
        <Card className={styles.shareCard}>
          <CopyLink text={link} />
          <div className={styles.shareButtons}>
            <a
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
              <RedditIcon size={20} />
            </a>
            <a
              className={css(styles.shareButton, styles.shareButtonTwitter)}
              href={
                clipMetadata.type === 'success'
                  ? `https://reddit.com/submit?url=${link}&title=${encodeURIComponent(
                      clipMetadata.data.title
                    )}`
                  : `https://reddit.com/submit?url=${link}`
              }
              target="__blank"
            >
              <TwitterIcon size={20} />
            </a>
            <a
              className={css(styles.shareButton, styles.shareButtonFacebook)}
              href={
                clipMetadata.type === 'success'
                  ? `https://reddit.com/submit?url=${link}&title=${encodeURIComponent(
                      clipMetadata.data.title
                    )}`
                  : `https://reddit.com/submit?url=${link}`
              }
              target="__blank"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClipPageBody;
