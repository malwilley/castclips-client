type Nil = null | undefined;

type Maybe<T> = T | Nil;

type Merge<T, U> = Omit<T, keyof U> & U;

type OptionalSpread<T = undefined> = T extends undefined ? [] : [T];
