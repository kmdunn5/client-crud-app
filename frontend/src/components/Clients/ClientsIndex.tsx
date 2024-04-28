import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Client } from "../../types/Client"
import { BASE_URL } from "../utils/url"

export function ClientIndex() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/client/list`)
      .then((response) => {
        console.log(response.data)
        setClients(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <Box>
      <Typography>Client Index</Typography>
      <Link to="/client/new">Create New Client</Link>
      {/* <Link to="/client/new">View Person</Link> */}
    </Box>
  )
}