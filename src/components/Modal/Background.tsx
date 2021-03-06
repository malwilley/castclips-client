import React, { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { css } from 'emotion'
import { colors } from 'styles'
import zIndex from 'styles/zIndex'
import { pick } from 'ramda'
import { animated, config, useTransition } from 'react-spring'

type ModalBackgroundProps = {
  handleClose: () => void
  isOpen: boolean
  width?: number
}

const styles = {
  contentContainer: (maxWidth: number) =>
    css({
      width: '100%',
      maxWidth,
      zIndex: zIndex.modal,
      WebkitOverflowScrolling: 'touch',
    }),
  main: css({
    '@media (max-width: 800px)': {
      padding: '60px 0 40px 0',
    },
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '260px 0 40px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkestAlpha30,
    overflowY: 'auto',
    zIndex: zIndex.modalBackground,
  }),
  scrollLock: css({
    position: 'fixed',
    width: '100%',
    overflowY: 'scroll',
  }),
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({
  children,
  handleClose,
  isOpen,
  width = 600,
}) => {
  const closeOnEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.scrollLock)
    } else {
      document.body.classList.remove(styles.scrollLock)
    }

    return () => {
      document.body.classList.remove(styles.scrollLock)
    }
  }, [isOpen])

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [closeOnEscape, handleClose])

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'scale(0.7)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.7)' },
    config: config.stiff,
  })

  return ReactDOM.createPortal(
    <>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.aside
            aria-modal
            aria-labelledby="modal-title"
            className={styles.main}
            key={key}
            onMouseDown={handleClose}
            role="dialog"
            style={pick(['opacity'], props)}
            tabIndex={-1}
          >
            <animated.div
              className={styles.contentContainer(width)}
              onMouseDown={(e) => e.stopPropagation()}
              style={pick(['opacity', 'transform'], props)}
            >
              {children}
            </animated.div>
          </animated.aside>
        ) : null
      )}
    </>,
    document.body
  )
}

export default ModalBackground
