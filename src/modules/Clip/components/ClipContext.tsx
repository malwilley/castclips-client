import * as React from 'react';
import SectionHeader from '~/components/SectionHeader';

type ClipContextProps = {};

const ClipContext: React.FC<ClipContextProps> = () => (
  <div>
    <SectionHeader>context for this clip</SectionHeader>
  </div>
);

export default ClipContext;
