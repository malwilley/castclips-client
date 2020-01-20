import { parse } from 'querystringify'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SearchType } from 'modules/search/types'
import Footer from 'components/Footer'
import { css } from 'emotion'
import Header from 'modules/header'
import RoundedCorners from 'components/RoundedCorners'
import { colors } from 'styles'
import HomePage from 'modules/home/components/HomePage'
import SigninPage from 'modules/auth/components/SigninPage'
import PodcastPage from 'modules/podcast/components/PodcastPage'
import ClipPage from 'modules/clip/components/ClipPage'
import SearchResultsPage from 'modules/search/components/SearchResultsPage'
import EpisodePage from 'modules/episode/components/EpisodePage'

const styles = {
  main: css({
    minHeight: '100vh',
    backgroundColor: colors.white,
    position: 'relative',
    paddingBottom: 80,
  }),
  bottomRounding: css({
    position: 'absolute',
    bottom: 0,
  }),
}

const AppRouter: React.FC = () => (
  <>
    <div className={styles.main}>
      <Route
        path="/"
        render={({ location: { search } }) => {
          const { q } = parse(search) as { q?: string }
          return <Header searchText={q} />
        }}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SigninPage} />
        <Route
          path="/podcast/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <PodcastPage id={id} />}
        />
        <Route path="/episode/:id" component={EpisodePage} />
        <Route
          path="/clip/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <ClipPage id={id} />}
        />
        <Route
          path="/search"
          render={({ location: { search } }) => {
            const { q, type, page } = parse(search) as {
              q: string
              type: SearchType
              page: number
            }
            return <SearchResultsPage query={q} type={type} page={page} />
          }}
        />
      </Switch>
      <RoundedCorners className={styles.bottomRounding} bottom />
    </div>
    <Footer />
  </>
)

export default AppRouter
