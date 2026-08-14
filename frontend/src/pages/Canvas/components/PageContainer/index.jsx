import './index.css'

import Canvas from '../Canvas'

function PageContainer({ page, zoom }) {
  const width = page.width * zoom
  const height = page.height * zoom

  return (
    <div
      className="page-container"
      style={{
        width,
        height
      }}
    >
      <Canvas
        page={page}
        zoom={zoom}
      />
    </div>
  )
}

export default PageContainer