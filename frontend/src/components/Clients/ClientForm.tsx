import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()

  let contacts = watch('contacts')

  useEffect(() => {
    console.log(clientId)
    if (clientId) {

      axios
        .get(`${BASE_URL}/client/${clientId}`)
        .then((response) => {
          console.log(response.data)
          // This is forcing this to work, I'm sure there's a better way.
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
        navigate(`/clients/${response.data.clientId}`)
      })
      .catch((error) => {
        if (error.code == 400) {
          console.log(error)
        } else {
          // kill app
        }
      })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          {/* there's a better way to do this, I can iterate over each input field */}
          <TextField error={errors.name != undefined} id="name" label="Client Name" variant="outlined" {...register( "name", { required: true } )}/>
          {errors.name && <span>This field is required</span>}
          <TextField error={errors.websiteUri != undefined} id="websiteUri" label="Website" variant="outlined" {...register("websiteUri", { required: true })}/>
          {errors.websiteUri && <span>This field is required</span>}
          <TextField error={errors.phoneNumber != undefined} id="phoneNumber" label="Phone Number" variant="outlined" {...register("phoneNumber", { required: true })}/>
          {errors.phoneNumber && <span>This field is required</span>}
          <TextField error={errors.streetAddress != undefined} sx={{marginBottom: "8px"}} id="streetAddress" label="Street Address" variant="outlined" {...register("streetAddress", { required: true })}/>
          {errors.streetAddress && <span>This field is required</span>}
          <TextField error={errors.city != undefined} sx={{marginBottom: "8px"}} id="city" label="City" variant="outlined" {...register("city", { required: true })}/>
          {errors.city && <span>This field is required</span>}
          <TextField error={errors.state != undefined} sx={{marginBottom: "8px"}} id="state" label="State" variant="outlined" {...register("state", { required: true, minLength: 2, maxLength: 2 })}/>
          {errors.state && <span>This field is required</span>}
          <TextField error={errors.zipCode != undefined} sx={{marginBottom: "8px"}} id="zipCode" label="Zip Code" variant="outlined" {...register("zipCode", { required: true, minLength: 5, maxLength: 5})}/>
          {errors.zipCode && <span>This field is required </span>}
          {
            people.length > 0 && 
            <>
              <FormLabel id="contacts">Who are my Contacts?</FormLabel>
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
          <Button sx={{marginTop: "8px"}} variant="contained" type="submit">Submit</Button>
        </FormControl>
      </form>
    </Box>
  )
}