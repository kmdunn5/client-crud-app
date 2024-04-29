import { Button, Card, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function ErrorBoundary() {
  const navigate = useNavigate()

  return (
    <Card sx={{paddingY: 4}}>
      <Typography variant="h3">Sorry, this route doesn't exist.</Typography>
      <Button onClick={() => navigate(-1)} >Go Back</Button>
    </Card>
  )
}

