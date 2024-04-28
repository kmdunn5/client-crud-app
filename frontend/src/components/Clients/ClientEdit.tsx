import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { ClientForm } from "./ClientForm"

export function ClientEdit() {
  const {id} = useParams()
  
  return (
    <Box>
      <Typography>Client Edit</Typography>
      <ClientForm clientId={id}/>
    </Box>
  )
}