import './index.css'

import Canvas from '../Canvas'

function PageContainer({ size }) {
  return (
    <div
      className="page-container"
      style={{
        width: size,
        height: size
      }}
    >
      <Canvas size={size} />
    </div>
  )
}

export default PageContainer