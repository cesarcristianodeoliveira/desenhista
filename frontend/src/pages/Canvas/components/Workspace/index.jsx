import {
  useCallback,
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
    zoomOut,
    setZoomLevel
  } = useEditor()

  const centerWorkspace = useCallback(() => {
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
  }, [])

  const calculateFitZoom = useCallback(() => {
    const workspace = workspaceRef.current

    if (!workspace) {
      return 1
    }

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

    return Math.min(
      scaleX,
      scaleY,
      1
    )
  }, [
    page
  ])

  const fitToScreen = useCallback(() => {
    const nextZoom =
      calculateFitZoom()

    setFitZoom(nextZoom)

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }, [
    calculateFitZoom,
    setFitZoom,
    centerWorkspace
  ])

  const handleZoomIn = useCallback(() => {
    zoomIn()

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }, [
    zoomIn,
    centerWorkspace
  ])

  const handleZoomOut = useCallback(() => {
    zoomOut()

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }, [
    zoomOut,
    centerWorkspace
  ])

  const handleZoomSelect = useCallback((value) => {
    setZoomLevel(value)

    requestAnimationFrame(() => {
      centerWorkspace()
    })
  }, [
    setZoomLevel,
    centerWorkspace
  ])

  useEffect(() => {
    const workspace = workspaceRef.current

    if (!workspace) {
      return undefined
    }

    const resizeObserver =
      new ResizeObserver(() => {
        fitToScreen()
      })

    resizeObserver.observe(workspace)

    fitToScreen()

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    fitToScreen
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
        onZoomSelect={handleZoomSelect}
        onFitZoom={fitToScreen}
      />
    </section>
  )
}

export default Workspace