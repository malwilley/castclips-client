import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModalState } from '../selectors';
import { actions } from '../redux/actions';

const useModalState = ({
  closeOnSuccess = false,
  handleClose,
}: {
  closeOnSuccess?: boolean;
  handleClose: () => void;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.modalReset());
  }, [dispatch]);

  const modalState = useSelector(getModalState);

  useEffect(() => {
    if (modalState.type === 'success' && closeOnSuccess) {
      dispatch(actions.modalReset());
      handleClose();
    }
  }, [closeOnSuccess, dispatch, handleClose, modalState.type]);

  return modalState;
};

export default useModalState;
