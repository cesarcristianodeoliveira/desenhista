import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Desenhista</h1>

        <p>
          Ferramentas para criação visual.
        </p>
      </header>

      <section className="products">
        <button
          className="product-card"
          type="button"
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
        </button>
      </section>
    </main>
  )
}

export default App