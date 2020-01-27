import React from 'react'
import TextSkeleton from './TextSkeleton'
import { colors } from 'styles'

type ParagraphSkeletonProps = {
  className?: string
}

const ParagraphSkeleton: React.FC<ParagraphSkeletonProps> = ({ className }) => (
  <div className={className}>
    <TextSkeleton height={20} width={100} color={colors.gray50} />
    <TextSkeleton height={20} width={300} color={colors.gray50} />
    <TextSkeleton height={20} width={200} color={colors.gray50} />
  </div>
)

export default ParagraphSkeleton
