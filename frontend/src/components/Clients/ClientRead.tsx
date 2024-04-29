import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Client } from "../../types/Client"
import { BASE_URL } from "../utils/url"

export function ClientRead() {
  const { id } = useParams()
  const [client, setClient] = useState<Client>()
  // use this to more impact please
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/client/${id}`)
      .then((response) => {
        setClient(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((error) => console.log(error));
  }, [id])

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/client/${id}`)
      .then((response) => {
        navigate("/clients")
      })
      .catch((error) => console.log(error));
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      paddingY: '24px',
      marginTop: '16px',
      marginX: 'auto',
      width:"75%"
    }}>
      <Typography variant="h1">{client?.name}</Typography>
      <Grid container spacing={2} sx={{marginBottom: "16px"}}>
        <Grid item xs={4}>
          <Typography>Address:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{client?.streetAddress}</Typography>
          <Typography>{client?.city}, {client?.state} {client?.zipCode}</Typography>
        </Grid>
      </Grid>
      { 
        (client?.contacts && client?.contacts.length > 0) &&
        <>
          <Divider orientation="horizontal" flexItem sx={{marginBottom: "16px"}}/>
          <Grid container spacing={2} sx={{marginBottom: "16px"}}>
            <Grid item xs={12}>
              <Typography>Contacts:</Typography>
            </Grid>
            { 
              client?.contacts.map((contact) => 
                <Grid component={Link} to={`/persons/${contact.personId}`} item xs={6}>
                  <Typography>{contact.firstName}</Typography>
                  <Typography>{contact.emailAddress}</Typography>
                </Grid>
            
              )

            }
          </Grid >
        </>
      }
      <Button component={Link} to={`/clients/${id}/edit`} >Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Box>
  )
}