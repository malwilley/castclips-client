import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'
import { useSelector } from 'react-redux'
import { UserLoggedIn } from 'modules/auth/types'
import Button from 'components/Button'
import firebase from 'modules/auth/firebase'
import Downshift from 'downshift'
import { colors, fonts, boxShadow } from 'styles'
import MenuDownIcon from 'mdi-react/MenuDownIcon'
import { secondaryButtonStyles } from 'components/SecondaryButton'
import zIndex from 'styles/zIndex'
import { stringify } from 'querystringify'
import { getUserState } from 'modules/auth/selectors'
import { useLocation } from 'react-router'

type HeaderAccountProps = {
  className?: string
}

const styles = {
  email: css({
    display: 'flex',
    alignItems: 'center',
  }),
  loggedInMain: css({
    position: 'relative',
  }),
  loggedInToggle: (isOpen: boolean) =>
    css({
      '&:hover svg': {
        color: colors.gray800,
      },
      '& svg': {
        color: isOpen ? colors.gray800 : colors.gray100,
      },
      outline: 'none',
      padding: '8px 12px',
      borderRadius: 8,
      cursor: 'pointer',
    }),
  menuDown: css({
    marginLeft: 6,
    transition: '250ms color ease-out',
  }),
  dropdown: css({
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: '10px 0',
    position: 'absolute',
    top: 54,
    right: 0,
    width: 200,
    boxShadow: boxShadow.card,
    zIndex: zIndex.flyout,
  }),
  dropdownItem: css({
    color: colors.gray700,
    padding: '10px 20px',
    cursor: 'pointer',
  }),
  dropdownItemHighlighted: css({
    backgroundColor: colors.gray20,
  }),
  signin: css(fonts.heading300, {
    padding: '10px 20px',
    backgroundColor: colors.secondary20,
    color: colors.secondary500,
    borderRadius: 8,
  }),
  userPic: css({
    height: 34,
    width: 34,
    borderRadius: '50%',
  }),
  userPicPlaceholder: css(fonts.heading200, {
    height: 34,
    width: 34,
    borderRadius: '50%',
    backgroundColor: colors.primary500,
    color: colors.white,
    lineHeight: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}

const HeaderAccountLoggedIn: React.FC<{ user: UserLoggedIn }> = ({ user }) => {
  const handleSelect = (item: string) => {
    switch (item) {
      case 'logout':
        return firebase.auth().signOut()
      default:
        return
    }
  }

  return (
    <Downshift onChange={handleSelect}>
      {({
        isOpen,
        toggleMenu,
        getMenuProps,
        getToggleButtonProps,
        getItemProps,
        highlightedIndex,
      }) => (
        <div className={styles.loggedInMain}>
          <Button
            {...getToggleButtonProps()}
            className={styles.loggedInToggle(isOpen)}
            onClick={() => toggleMenu()}
          >
            <div className={styles.email}>
              {user.data.photoUrl ? (
                <img alt="User avatar" className={styles.userPic} src={user.data.photoUrl} />
              ) : (
                <div className={styles.userPicPlaceholder}>{user.data.email[0].toUpperCase()}</div>
              )}
              <MenuDownIcon className={styles.menuDown} size={24} />
            </div>
          </Button>
          {isOpen && (
            <ul className={styles.dropdown} {...getMenuProps()}>
              <li
                className={css(
                  styles.dropdownItem,
                  highlightedIndex === 0 && styles.dropdownItemHighlighted
                )}
                {...getItemProps({ item: 'logout' })}
              >
                Log out
              </li>
            </ul>
          )}
        </div>
      )}
    </Downshift>
  )
}

const HeaderAccountLoggedOut: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <Link
      className={secondaryButtonStyles}
      to={`/signin${stringify({ destination: pathname }, true)}`}
    >
      Sign in
    </Link>
  )
}

const HeaderAccount: React.FC<HeaderAccountProps> = ({ className }) => {
  const user = useSelector(getUserState)

  return (
    <div className={className}>
      {user.type === 'loggedin' ? (
        <HeaderAccountLoggedIn user={user} />
      ) : (
        <HeaderAccountLoggedOut />
      )}
    </div>
  )
}

export default HeaderAccount
