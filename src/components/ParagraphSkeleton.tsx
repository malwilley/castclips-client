import * as React from 'react';
import TextSkeleton from './TextSkeleton';
import { colors } from '~/styles';

type ParagraphSkeletonProps = {};

const ParagraphSkeleton: React.FC<ParagraphSkeletonProps> = () => (
  <div>
    <TextSkeleton height={20} width={100} color={colors.gray50} />
    <TextSkeleton height={20} width={300} color={colors.gray50} />
    <TextSkeleton height={20} width={200} color={colors.gray50} />
  </div>
);

export default ParagraphSkeleton;
