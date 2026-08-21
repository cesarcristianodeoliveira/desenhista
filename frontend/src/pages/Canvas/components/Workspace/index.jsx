import {
  useEffect,
  useRef
} from 'react'

import {
  useEditor
} from '../../../../contexts/EditorContext'

import PageContainer from '../PageContainer'
import BottomBar from './components/BottomBar'

const WORKSPACE_PADDING = 64

function Workspace({
  page,
  onReady
}) {
  const workspaceRef = useRef(null)
  const scrollRef = useRef(null)

  const {
    zoom,
    setFitZoom,
    zoomIn,
    zoomOut
  } = useEditor()

  const centerWorkspace = () => {
    const scroll = scrollRef.current

    if (!scroll) {
      return
    }

    scroll.scrollLeft =
      Math.max(
        0,
        (scroll.scrollWidth - scroll.clientWidth) / 2
      )

    scroll.scrollTop =
      Math.max(
        0,
        (scroll.scrollHeight - scroll.clientHeight) / 2
      )
  }

  const handleZoomIn = () => {
    zoomIn()

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }

  const handleZoomOut = () => {
    zoomOut()

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }

  useEffect(() => {
    const workspace = workspaceRef.current

    if (!workspace) {
      return undefined
    }

    const updateZoom = () => {
      const {
        width,
        height
      } = workspace.getBoundingClientRect()

      const availableWidth =
        width - WORKSPACE_PADDING

      const availableHeight =
        height - WORKSPACE_PADDING

      const scaleX =
        availableWidth / page.width

      const scaleY =
        availableHeight / page.height

      const nextZoom = Math.min(
        scaleX,
        scaleY,
        1
      )

      setFitZoom(nextZoom)

      requestAnimationFrame(() => {
        centerWorkspace()
      })
    }

    const resizeObserver =
      new ResizeObserver(updateZoom)

    resizeObserver.observe(workspace)

    updateZoom()

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    page,
    setFitZoom
  ])

  return (
    <section className="workspace">
      <div
        ref={workspaceRef}
        className="workspace-area"
      >
        <div
          ref={scrollRef}
          className="workspace-scroll"
        >
          <div className="workspace-content">
            <PageContainer
              page={page}
              zoom={zoom}
              onReady={onReady}
            />
          </div>
        </div>
      </div>

      <BottomBar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </section>
  )
}

export default Workspace