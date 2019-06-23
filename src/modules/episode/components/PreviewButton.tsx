import * as React from 'react';
import { ButtonProps } from 'src/components/Button';
import { PlayCircleIcon, StopCircleIcon } from 'mdi-react';
import SecondaryButton from 'src/components/SecondaryButton';

type PreviewButtonProps = ButtonProps & {
  previewing: boolean;
};

const PreviewButton: React.FC<PreviewButtonProps> = ({ previewing, ...props }) => (
  <SecondaryButton {...props}>
    {previewing ? 'Previewing...' : 'Preview'}
    {previewing ? <StopCircleIcon size={20} /> : <PlayCircleIcon size={20} />}
  </SecondaryButton>
);

export default PreviewButton;
