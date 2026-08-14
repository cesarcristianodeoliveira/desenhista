import './index.css'

function PageContainer({ size }) {
  return (
    <div
      className="page-container"
      style={{
        width: size,
        height: size
      }}
    >
      Page
    </div>
  )
}

export default PageContainer