import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import './global.css'

const LazyExample = React.lazy(() =>
  import('./module').then(({ Example }) => ({ default: Example })),
)

const App = () => (
  <h1>
    <Suspense>
      <LazyExample />
    </Suspense>
  </h1>
)

const root = createRoot(document.getElementById('root'))
root.render(<App />)
