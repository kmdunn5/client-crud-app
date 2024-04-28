import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PersonEdit() {
  const {id} = useParams()
  const [people, setPeople] = useState<Person[]>([])

  // client list call
  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`${BASE_URL}/client/list`)
      .then((response) => {
        console.log(response.data)
        setPeople(response.data);
      })
      // .finally(() => {
      //   setIsLoading(false);
      // });
      .catch((error) => console.log(error));
  }, []);
  
  // person call
  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`${BASE_URL}/person/${id}`)
      .then((response) => {
        console.log(response.data)
        setPeople(response.data);
      })
      // .finally(() => {
      //   setIsLoading(false);
      // });
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box>
      <Typography>Person Edit</Typography>
    </Box>
  )
}