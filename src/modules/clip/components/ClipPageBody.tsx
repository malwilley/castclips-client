import React from 'react'
import { css } from 'emotion'
import HttpContent from 'components/HttpContent'
import { ClipState } from '../types'
import EyeOutlineIcon from 'mdi-react/EyeOutlineIcon'
import CalendarDayIcon from 'mdi-react/CalendarDayIcon'
import SectionHeader from 'components/SectionHeader'
import ClipContext from './ClipContext'
import TruncateContent from 'components/TruncateContent'
import Attribute from 'components/Attribute'
import ParagraphSkeleton from 'components/ParagraphSkeleton'
import formatClipAge from 'utils/formatClipAge'
import { ClipSharing } from './ClipSharing'
import ClipEditing from './ClipEditing'

type ClipPageBodyProps = {
  clipId: string
  clipMetadata: ClipState['metadata']
}

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
}

const ClipPageBodyMain: React.FC<Pick<ClipPageBodyProps, 'clipMetadata'>> = ({ clipMetadata }) => (
  <HttpContent
    request={clipMetadata}
    renderFetching={() => (
      <div>
        <SectionHeader>description</SectionHeader>
        <ParagraphSkeleton />
      </div>
    )}
    renderSuccess={(clip) => (
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
)

const ClipPageBodySide: React.FC<ClipPageBodyProps> = ({ clipId, clipMetadata }) => {
  return (
    <>
      <ClipEditing />
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
      <ClipSharing {...{ clipId, clipMetadata }} />
    </>
  )
}

const ClipPageBody: React.FC<ClipPageBodyProps> = ({ clipId, clipMetadata }) => (
  <div className={styles.main}>
    <div className={styles.mainContainer}>
      <ClipPageBodyMain {...{ clipMetadata }} />
    </div>
    <div className={styles.sideContainer}>
      <ClipPageBodySide {...{ clipId, clipMetadata }} />
    </div>
  </div>
)

export default ClipPageBody
