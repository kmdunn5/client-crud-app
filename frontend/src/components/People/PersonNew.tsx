import { Box, Typography } from "@mui/material"
import { PersonForm } from "./PersonForm"

export function PersonNew() {
  return (
    <Box>
      <Typography>Person Create</Typography>
      <PersonForm />
    </Box>
  )
}