import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from 'react-router-dom'

import './App.css'

import Canvas from './pages/Canvas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className="app">
              <header className="app-header">
                <h1>Desenhista</h1>

                <p>
                  Ferramentas para criação visual.
                </p>
              </header>

              <section className="products">
                <Link
                  className="product-card"
                  to="/canvas"
                >
                  <span className="product-icon">
                    🎨
                  </span>

                  <span className="product-name">
                    Canvas
                  </span>

                  <span className="product-description">
                    Crie sua comunicação visual.
                  </span>
                </Link>
              </section>
            </main>
          }
        />

        <Route
          path="/canvas"
          element={<Canvas />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App