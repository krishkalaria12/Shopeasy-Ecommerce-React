import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default App
