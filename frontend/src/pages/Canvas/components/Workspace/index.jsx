import {
  useEffect,
  useRef,
  useState
} from 'react'

import PageContainer from '../PageContainer'

const WORKSPACE_PADDING = 64

function Workspace() {
  const workspaceRef = useRef(null)

  const [pageSize, setPageSize] = useState(600)

  useEffect(() => {
    const workspace = workspaceRef.current

    if (!workspace) {
      return undefined
    }

    const updatePageSize = () => {
      const {
        width,
        height
      } = workspace.getBoundingClientRect()

      const availableWidth = width - WORKSPACE_PADDING
      const availableHeight = height - WORKSPACE_PADDING

      const nextPageSize = Math.min(
        availableWidth,
        availableHeight,
        600
      )

      setPageSize(nextPageSize)
    }

    const resizeObserver = new ResizeObserver(updatePageSize)

    resizeObserver.observe(workspace)

    updatePageSize()

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <section
      ref={workspaceRef}
      className="workspace"
    >
      <PageContainer size={pageSize} />
    </section>
  )
}

export default Workspace