import React from 'react'
import { ButtonProps } from 'components/Button'
import PlayCircleIcon from 'mdi-react/PlayCircleIcon'
import StopCircleIcon from 'mdi-react/StopCircleIcon'
import SecondaryButton from 'components/SecondaryButton'

type PreviewButtonProps = ButtonProps & {
  previewing: boolean
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ previewing, ...props }) => (
  <SecondaryButton {...props}>
    {previewing ? 'Previewing...' : 'Preview'}
    {previewing ? <StopCircleIcon size={20} /> : <PlayCircleIcon size={20} />}
  </SecondaryButton>
)

export default PreviewButton
