import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useForm } from "react-hook-form"
import { BASE_URL } from "../utils/url"
import { ClientForm } from "./ClientForm"

export function ClientNew() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("asklfjas")
    axios
      .post(`${BASE_URL}/person/create`, data, { headers: { 'Content-Type': 'application/json' }})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        if (error.code == 400) {
          console.log("lkasjf")
        } else {
          // kill app
        }
      })
  }

  return (
    <Box>
      <Typography>Client Create</Typography>
      <ClientForm />
    </Box>
  )
}