import * as React from 'react';
import { css } from 'emotion';
import Button from './Button';
import { colors } from '~/styles';
import { ClipboardOutlineIcon } from 'mdi-react';

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
    backgroundColor: colors.lightest,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottom: `1px solid ${colors.gray}`,
    borderLeft: `1px solid ${colors.gray}`,
    borderTop: `1px solid ${colors.gray}`,
    overflow: 'hidden',
  }),
  input: css({
    background: 'none',
    outline: 'none',
    border: 'none',
    width: '100%',
    height: '100%',
    padding: 10,
    fontSize: 12,
  }),
  clipboardButton: css({
    ':hover': {
      backgroundColor: colors.grayLight,
    },
    backgroundColor: colors.light,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    border: `1px solid ${colors.gray}`,
    color: colors.gray,
    height: '100%',
    width: 50,
    padding: 8,
  }),
};

// todo: change color/icon on success
// settimeout for changeing back to normal
// animate?

const CopyLink: React.FC<CopyLinkProps> = ({ className, text }) => {
  const [copied, setCopied] = React.useState<null | 'copied' | 'error'>(null);
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

  return (
    <div className={css(styles.main, className)}>
      <div className={styles.inputContainer}>
        <input className={styles.input} ref={ref} value={text} />
      </div>
      <Button className={styles.clipboardButton} onClick={copyToClipboard}>
        <ClipboardOutlineIcon />
      </Button>
    </div>
  );
};

export default CopyLink;
