import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PeopleIndex() {
  const [people, setPeople] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/person/list`)
      .then((response) => {
        console.log(response.data)
        setPeople(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <Box>
      <Typography>Person Index</Typography>
      <Link to="/person/new">Create New Person</Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow
                component={Link}
                to={`/person/${person.personId}`}
                key={person.personId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="person">
                  {person.firstName}
                </TableCell>
                <TableCell align="right">{person.lastName}</TableCell>
                <TableCell align="right">{person.emailAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}