import React from 'react'
import Button, { ButtonProps } from 'components/Button'
import { css } from 'emotion'
import { colors } from 'styles'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'
import ChevronUpIcon from 'mdi-react/ChevronUpIcon'

type ShowHideClipOptionsProps = ButtonProps & {
  show: boolean
}

const styles = {
  main: css({
    '&:hover': {
      backgroundColor: colors.secondary50,
    },
    backgroundColor: colors.secondary20,
    color: colors.primary500,
    padding: '12px 20px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    transition: '100ms background-color ease-out',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  }),
  icon: css({
    marginLeft: 8,
  }),
}

const ShowHideClipOptions: React.FC<ShowHideClipOptionsProps> = ({ show, ...props }) => (
  <Button className={styles.main} {...props}>
    {show ? (
      <>
        Hide clip options <ChevronUpIcon className={styles.icon} size={20} />
      </>
    ) : (
      <>
        Create a clip <ChevronDownIcon className={styles.icon} size={20} />
      </>
    )}
  </Button>
)

export default ShowHideClipOptions
