import PlusCircleOutlineIcon from 'mdi-react/PlusCircleOutlineIcon';
import React from 'react';
import { ButtonProps } from 'src/components/Button';
import PrimaryButton from 'src/components/PrimaryButton';

const ShareButton: React.SFC<ButtonProps> = ({ className, ...props }) => (
  <PrimaryButton {...props} className={className}>
    Create
    <PlusCircleOutlineIcon size={16} />
  </PrimaryButton>
);

export default ShareButton;
