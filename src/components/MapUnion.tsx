import { FC } from 'react'

type MapUnionProps<TType extends string, TUnion extends { type: TType }> = {
  map: {
    [Type in TType]: (props: TUnion extends { type: Type } ? TUnion : never) => ReturnType<FC>
  }

  union: TUnion
}

const MapUnion = <TType extends string, TUnion extends { type: TType }>({
  map,
  union,
}: MapUnionProps<TType, TUnion>) => {
  const render = map[union.type]

  if (!render) {
    return null
  }

  return render(union as any)
}

export default MapUnion
