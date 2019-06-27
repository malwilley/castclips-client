import React, { useCallback } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Partial<{
    handleTextChange: (text: string) => void;
    focus?: boolean;
  }>;

const Input: React.FC<InputProps> = ({ handleTextChange, focus, ...props }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (focus && ref.current) {
      ref.current.focus();
    }
  }, [focus, ref]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleTextChange && handleTextChange(e.target.value);
    },
    [handleTextChange]
  );

  return <input ref={ref} onChange={onChange} {...props} />;
};

export default Input;
