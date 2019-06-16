import * as React from 'react';
import { css } from 'emotion';
import Button from './Button';
import { colors, fonts } from 'src/styles';
import { ClipboardTextOutlineIcon } from 'mdi-react';

type CopyLinkProps = {
  className?: string;
  text: string;
};

const styles = {
  main: css({
    height: 40,
    display: 'flex',
    width: '100%',
  }),
  inputContainer: css({
    flexGrow: 1,
    width: 0,
    backgroundColor: colors.lightest,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottom: `1px solid ${colors.gray50}`,
    borderLeft: `1px solid ${colors.gray50}`,
    borderTop: `1px solid ${colors.gray50}`,
    overflow: 'hidden',
  }),
  input: css(fonts.text200, {
    background: 'none',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: '100%',
    padding: '0 0.6rem',
  }),
  clipboardButton: css({
    ':hover': {
      backgroundColor: colors.secondary20,
    },
    backgroundColor: colors.gray20,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    border: `1px solid ${colors.gray50}`,
    color: colors.gray500,
    height: '100%',
    width: 50,
    padding: 8,
    transition: 'background-color 200ms ease-out',
  }),
};

// todo: change color/icon on success
// settimeout for changeing back to normal
// animate?

const CopyLink: React.FC<CopyLinkProps> = ({ className, text }) => {
  const [, setCopied] = React.useState<null | 'copied' | 'error'>(null);
  const ref = React.useRef<HTMLInputElement>(null);

  const copyToClipboard = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    try {
      ref.current.select();
      document.execCommand('copy');
      setCopied('copied');
    } catch {
      setCopied('error');
    }
  }, [ref]);

  const selectOnClick = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.select();
  }, [ref]);

  return (
    <div className={css(styles.main, className)}>
      <div className={styles.inputContainer}>
        <input className={styles.input} onClick={selectOnClick} ref={ref} value={text} />
      </div>
      <Button className={styles.clipboardButton} onClick={copyToClipboard}>
        <ClipboardTextOutlineIcon size={20} />
      </Button>
    </div>
  );
};

export default CopyLink;
