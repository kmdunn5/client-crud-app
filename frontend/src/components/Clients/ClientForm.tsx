import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

type ClientFormProps = {
  clientId?: string
}

interface ClientFormType {
  clientId: string
  name: string
  websiteUri: string
  phoneNumber: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  contacts: string[]
}

export function ClientForm({clientId}: ClientFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ClientFormType>({defaultValues: {contacts: []}})
  const [people, setPeople] = useState<Person[]>([])

  let contacts = watch('contacts')

  useEffect(() => {
    console.log(clientId)
    if (clientId) {

      axios
        .get(`${BASE_URL}/client/${clientId}`)
        .then((response) => {
          console.log(response.data)
          Object.entries<string | Person[]>(response.data).forEach(([k, v]) => {
            if (k === "contacts" && typeof v !== "string") {
              setValue("contacts", v.map((v) => v.personId))
            } else {
              setValue(k as keyof ClientFormType, v as string)
            }
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
    let contacts = data.contacts.map((id: string) => people.find((person) => person.personId === id))
    const axiosRouter = clientId ? axios.put : axios.post
    axiosRouter(`${BASE_URL}/client${clientId ? "/" + clientId : ""}`, {...data, contacts}, {headers: {"Content-Type": "application/json"}})
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
              <InputLabel id="contacts">Who are my Contacts?</InputLabel>
              <Select
                multiple
                value={contacts}
                labelId="contacts"
                id="contacts"
                label="contacts"
                {...register("contacts")}
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