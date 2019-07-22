import { useDispatch } from 'react-redux';
import { parse, stringify } from 'querystringify';
import { push, replace } from 'connected-react-router';

const useChangeQueryParam = (pushOrReplace: typeof push | typeof replace = push) => {
  const dispatch = useDispatch();

  return (key: string, value: string | number) => {
    const pathname = window.location.pathname;
    const search = parse(window.location.search);

    dispatch(pushOrReplace(`${pathname}${stringify({ ...search, [key]: value }, true)}`));
  };
};

export default useChangeQueryParam;
