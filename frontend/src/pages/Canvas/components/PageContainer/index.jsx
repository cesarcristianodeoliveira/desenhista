import {
  useRef
} from 'react'

import './index.css'

import Canvas from '../Canvas'

function PageContainer({ page, zoom }) {
  const hiddenTextareaContainerRef = useRef(null)

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
      <div
        className="page-content"
        style={{
          width: page.width,
          height: page.height,
          transform: `scale(${zoom})`
        }}
      >
        <Canvas
          page={page}
          hiddenTextareaContainer={
            hiddenTextareaContainerRef
          }
        />
      </div>

      <div
        ref={hiddenTextareaContainerRef}
        className="fabric-textarea-container"
      />
    </div>
  )
}

export default PageContainer