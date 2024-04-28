import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

type ClientFormProps = {
  clientId?: string
}

export function ClientForm({clientId}: ClientFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    if (clientId) {
      axios
        .get(`${BASE_URL}/client/${clientId}`)
        .then((response) => {
          console.log(response.data)
          Object.entries(response.data).forEach(([k, v]) => {
            setValue(k, v)
          })
        })
        .catch((error) => console.log(error))
    }
  }, [clientId])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/person/list`)
      .then((response) => {
        console.log(response.data)
        setPeople(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const onSubmit = (data: any) => {
    let route = clientId ? `edit/${clientId}` : "create"
    axios
      .post(`${BASE_URL}/client/${route}`, data, { headers: { 'Content-Type': 'application/json' }})
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
          <TextField id="name" label="Client Name" variant="outlined" {...register( "name", { required: true } )}/>
          <TextField id="websiteUri" label="Website" variant="outlined" {...register("websiteUri", { required: true })}/>
          <TextField id="phoneNumber" label="Phone Number" variant="outlined" {...register("phoneNumber", { required: true })}/>
          <TextField id="streetAddress" label="Street Address" variant="outlined" {...register("streetAddress", { required: true })}/>
          <TextField id="city" label="City" variant="outlined" {...register("city", { required: true })}/>
          <TextField id="state" label="State" variant="outlined" {...register("state", { required: true })}/>
          <TextField id="zipCode" label="Zip Code" variant="outlined" {...register("zipCode", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          {
            people.length > 0 && 
            <>
              <InputLabel id="client">Who are my Contacts?</InputLabel>
              <Select
                multiple
                value={[]}
                labelId="client"
                id="client"
                label="Client"
                {...register("clientId")}
              >
                {people.map((person) =>
                  <MenuItem value={person.personId}>{person.firstName + " " + person.lastName}</MenuItem>
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