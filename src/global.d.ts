type Nil = null | undefined;

type Maybe<T> = T | Nil;

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Merge<T, U> = Omit<T, keyof U> & U;
