import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PersonRead() {
  const { id } = useParams()
  const [person, setPerson] = useState<Person>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

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

  return (
    <Box>
      <Typography>{person?.firstName}</Typography>
      <Link to={`/person/${id}/edit`}>Edit Me!</Link>

    </Box>
  )
}