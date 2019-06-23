import { css } from 'emotion';
import { ShareIcon, ContentCutIcon, PlusCircleOutlineIcon } from 'mdi-react';
import * as React from 'react';
import Button, { ButtonProps } from 'src/components/Button';
import PrimaryButton from 'src/components/PrimaryButton';

const ShareButton: React.SFC<ButtonProps> = ({ className, ...props }) => (
  <PrimaryButton {...props} className={className}>
    Create
    <PlusCircleOutlineIcon size={16} />
  </PrimaryButton>
);

export default ShareButton;
