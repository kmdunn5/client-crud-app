import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell align="right">Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                component={Link}
                to={`/client/${client.clientId}`}
                key={client.clientId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                
              >
                <TableCell component="th" scope="client">
                  {client.name}
                </TableCell>
                <TableCell align="right">{client.websiteUri}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}