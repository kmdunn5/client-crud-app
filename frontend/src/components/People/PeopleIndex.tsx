import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PeopleIndex() {
  const [people, setPeople] = useState<Person[]>([])


  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`${BASE_URL}/person/list`)
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
      <Typography>Person Index</Typography>
    </Box>
  )
}