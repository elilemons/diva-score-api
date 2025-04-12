import * as React from 'react'
import { useAuth } from 'payload/components/utilities'
import { User } from '../../payload-types'
// import { useParams } from 'react-router-dom'

const ExportUsersButton: React.FC = () => {
  // const [searchParams] = useParams()
  const [isExporting, setIsExporting] = React.useState(false)
  const { user } = useAuth<User>()

  if (!user) {
    return null
  } else {
    const handleExportCSV = async () => {
      setIsExporting(true)
      try {
        const response = await fetch(
          `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/export-csv`,
          {
            method: 'GET',
            credentials: 'include', // Add this line to include authentication cookies
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`Export failed: ${response.statusText}`)
        }

        if (response.ok) {
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `users-export-${new Date().toISOString()}.csv`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }
      } catch (error) {
        console.error('Export failed:', error)
      }
      setIsExporting(false)
    }
    return (
      <button
        onClick={handleExportCSV}
        disabled={isExporting}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isExporting ? 'not-allowed' : 'pointer',
        }}
      >
        {isExporting ? 'Exporting...' : 'Export Users to CSV'}
      </button>
    )
  }
}

export default ExportUsersButton
