import {
  useEffect,
  useRef,
  useState
} from 'react'

import PageContainer from '../PageContainer'

const WORKSPACE_PADDING = 64

function Workspace({
  page,
  onReady
}) {
  const workspaceRef = useRef(null)

  const [zoom, setZoom] = useState(1)

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

      setZoom(nextZoom)
    }

    const resizeObserver =
      new ResizeObserver(updateZoom)

    resizeObserver.observe(workspace)

    updateZoom()

    return () => {
      resizeObserver.disconnect()
    }
  }, [page])

  return (
    <section
      ref={workspaceRef}
      className="workspace"
    >
      <PageContainer
        page={page}
        zoom={zoom}
        onReady={onReady}
      />
    </section>
  )
}

export default Workspace