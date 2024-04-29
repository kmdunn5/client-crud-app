import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { PersonForm } from "./PersonForm"

export function PersonEdit() {
  const { id } = useParams()

  return (
    <Box>
      <Typography>Person Edit</Typography>
      <PersonForm personId={id} />
    </Box>
  )
}