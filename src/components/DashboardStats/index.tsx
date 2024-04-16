import { AdminViewComponent } from 'payload/config'
import * as React from 'react'

const DashboardStats: AdminViewComponent = () => {
  const [totalGoals, setTotalGoals] = React.useState(0)

  React.useEffect(() => {
    async function getGoals() {
      await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/surveys/get-total-goals-met`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const goals = await res.json()
        setTotalGoals(goals.totalGoals)
      })
    }

    if (!totalGoals) {
      getGoals()
    }
  }, [totalGoals])
  return (
    <div>
      <h2>Total Goals Met: {totalGoals}</h2>
    </div>
  )
}

export default DashboardStats
