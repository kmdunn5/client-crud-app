import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Client } from "../../types/Client"
import { BASE_URL } from "../utils/url"

type PersonFormProps = {
  personId?: string
}

export function PersonForm({personId}: PersonFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    if (personId) {
      axios
        .get(`${BASE_URL}/person/${personId}`)
        .then((response) => {
          console.log(response.data)
          Object.entries(response.data).forEach(([k, v]) => {
            setValue(k, v)
          })
        })
        .catch((error) => console.log(error))
    }
  }, [personId])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/client/list`)
      .then((response) => {
        console.log(response.data)
        setClients(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const onSubmit = (data: any) => {
    let route = personId ? `edit/${personId}` : "create"
    axios
      .post(`${BASE_URL}/person/${route}`, data, { headers: { 'Content-Type': 'application/json' }})
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField id="firstName" label="First Name" variant="outlined" {...register( "firstName", { required: true } )}/>
          {errors.firstName && <span>This field is required</span>}
          <TextField id="lastName" label="Last Name" variant="outlined" {...register("lastName", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          <TextField id="emailAddress" label="Email Address" variant="outlined" {...register("emailAddress", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          <TextField id="streetAddress" label="Email" variant="outlined" {...register("streetAddress", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          <TextField id="city" label="City" variant="outlined" {...register("city", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          <TextField id="state" label="State" variant="outlined" {...register("state", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          <TextField id="zipCode" label="Zip Code" variant="outlined" {...register("zipCode", { required: true })}/>
          {errors.zipCode && <span>{errors.zipCode.message?.toString()}</span>}
          {/* <Button variant="outlined">Submit</Button> */}
          {
            clients.length > 0 && 
            <>
              <InputLabel id="client">Pick My Client</InputLabel>
              <Select
                labelId="client"
                id="clientId"
                label="Client"
                {...register("clientId")}
              >
                {clients.map((client) =>
                  <MenuItem value={client.clientId}>{client.name}</MenuItem>
                )}
              </Select>
            </>
          }
          <input type="submit" />
        </FormControl>
      </form>
    </Box>
  )
}