function Toolbar({ onAddText }) {
  return (
    <div>
      <button onClick={onAddText}>
        Adicionar texto
      </button>
    </div>
  )
}

export default Toolbar