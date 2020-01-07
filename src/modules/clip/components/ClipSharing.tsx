import React from 'react'
import { css } from 'emotion'
import Card from 'components/Card'
import CopyLink from 'components/CopyLink'
import RedditIcon from 'mdi-react/RedditIcon'
import FacebookIcon from 'mdi-react/FacebookIcon'
import TwitterIcon from 'mdi-react/TwitterIcon'
import SectionHeader from 'components/SectionHeader'
import AccessibleLabel from 'components/AccessibleLabel'
import Tooltip from 'components/Tooltip'
import { colors } from 'styles'
import { ClipState } from '../types'

type ClipPageBodyProps = {
  clipId: string
  clipMetadata: ClipState['metadata']
}

const styles = {
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
}

export const ClipSharing: React.FC<ClipPageBodyProps> = ({ clipId, clipMetadata }) => {
  const link = `https://castclips.com/clip/${clipId}`

  return (
    <>
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
    </>
  )
}
