import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PersonRead() {
  const { id } = useParams()
  const [person, setPerson] = useState<Person>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/person/${id}`)
      .then((response) => {
        console.log(response.data)
        setPerson(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id])

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/person/${id}`)
      .then((response) => {
        navigate("/persons")
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
      <Typography variant="h1">{person?.firstName} {person?.lastName}</Typography>
      <Grid container spacing={2} sx={{marginBottom: "16px"}}>
        <Grid item xs={4}>
          <Typography>Address:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{person?.streetAddress}</Typography>
          <Typography>{person?.city}, {person?.state} {person?.zipCode}</Typography>
        </Grid>
      </Grid>
      { 
        person?.client &&
        <>
          <Divider orientation="horizontal" flexItem sx={{marginBottom: "16px"}}/>
          <Grid container spacing={2} sx={{marginBottom: "16px"}}>
            <Grid item xs={4}>
              <Typography>Client:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component={Link} to={`/clients/${person.client.clientId}`}>{person?.client.name}</Typography>
            </Grid>
          </Grid >
        </>
      }
      <Link to={`/persons/${id}/edit`}>Edit Me!</Link>
      <Button onClick={handleDelete}>Delete</Button>
    </Box>
  )
}