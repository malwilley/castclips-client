import React from 'react'
import Card from 'components/Card'
import { css } from 'emotion'
import { colors } from 'styles'

const styles = {
  main: css({
    '& div': {
      borderRadius: 4,
    },
    padding: 16,
  }),
  title: css({
    backgroundColor: colors.gray200,
    width: 200,
    height: 16,
    marginBottom: 4,
  }),
  episode: css({
    backgroundColor: colors.gray50,
    width: 150,
    height: 14,
    marginBottom: 12,
  }),
  footer: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  time: css({
    backgroundColor: colors.gray50,
    width: 50,
    height: 14,
  }),
  viewStars: css({
    backgroundColor: colors.gray50,
    width: 80,
    height: 15,
  }),
}

const PodcastClipCardFetching: React.FC = () => (
  <Card className={styles.main}>
    <div className={styles.title} />
    <div className={styles.episode} />
    <div className={styles.footer}>
      <div className={styles.time} />
      <div className={styles.viewStars} />
    </div>
  </Card>
)

export default PodcastClipCardFetching
