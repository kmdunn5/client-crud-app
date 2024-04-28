import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Client } from "../../types/Client"
import { BASE_URL } from "../utils/url"

export function ClientRead() {
  const { id } = useParams()
  const [client, setClient] = useState<Client>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    console.log("a;lksdjfl;kasjdf")
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/client/${id}`)
      .then((response) => {
        console.log(response.data)
        setClient(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id])

  return (
    <Box>
      <Typography>{client?.name}</Typography>
      <Link to={`/client/${id}/edit`}>Edit Me!</Link>

    </Box>
  )
}