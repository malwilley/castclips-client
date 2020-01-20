import React, { Suspense, lazy } from 'react'
import PulsingLogo from './components/PulsingLogo'

const AppRouter = lazy(/* webpackChunkName: "app-pages" */ () => import('components/AppRouter'))

const App: React.FC = () => (
  <Suspense fallback={<PulsingLogo />}>
    <AppRouter />
  </Suspense>
)

export default App
