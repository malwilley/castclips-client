import * as React from 'react'
/*
type UnionType = {
  type: string;
};

type RenderFunctionMap<U extends UnionType> = {
  [type in U['type']]: (props: { [key: string]: any }) => JSX.Element | null
};

type UnionContentProps<U extends UnionType> = {
  union: U;
  renderFunctions: Partial<RenderFunctionMap<U>>;
};

const UnionContent = <U extends UnionType>({ union, renderFunctions }: UnionContentProps<U>) => {
  const { type, ...props } = union;

  const renderFunction = renderFunctions[type];
  if (renderFunction) {
    return renderFunction(props);
  }

  return null;
};

export default UnionContent;
*/
