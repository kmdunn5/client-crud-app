import { Box, Button, FormControl, FormLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Client } from "../../types/Client"
import { BASE_URL } from "../utils/url"

type PersonFormProps = {
  personId?: string
}

export interface PersonFormType {
  personId: string
  firstName: string
  lastName: string
  emailAddress: string
  streetAddress: string // does this address become it's own object?
  city: string
  state: string //Could be an enum of state abbreviations if I want
  zipCode: string
  clientId?: string
}

export function PersonForm({personId}: PersonFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PersonFormType>()
  const [clients, setClients] = useState<Client[]>([])
  const navigate = useNavigate()

  const clientId = watch("clientId")

  useEffect(() => {
    if (personId) {
      axios
        .get(`${BASE_URL}/person/${personId}`)
        .then((response) => {
          // This is forcing this to work, I'm sure there's a better way.
          Object.entries<string | Client>(response.data).forEach(([k, v]) => {
            if (k === "client" && typeof v !== "string") {
              setValue("clientId", v?.clientId)
            } else {
              setValue(k as keyof PersonFormType, v as string)
            }
          })
        })
        .catch((error) => console.log(error))
    }
  }, [personId])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/client/list`)
      .then((response) => {
        setClients(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const onSubmit = (data: any) => {
    let client = clients.find((client) => client.clientId === data.clientId)
    const axiosRouter = personId ? axios.put : axios.post
    axiosRouter(`${BASE_URL}/person${personId ? "/" + personId : ""}`, {...data, client}, {headers: {"Content-Type": "application/json"}})
      .then((response) => {
        navigate(`/persons/${response.data.personId}`)
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
          {/* this would all be better as controllers */}
          <TextField error={errors.firstName != undefined} sx={{marginBottom: "8px"}} id="firstName" label="First Name" variant="outlined" {...register( "firstName", { required: true } )}/>
          {errors.firstName && <span>This field is required</span>}
          <TextField error={errors.lastName != undefined} sx={{marginBottom: "8px"}} id="lastName" label="Last Name" variant="outlined" {...register("lastName", { required: true })}/>
          {errors.lastName && <span>This field is required</span>}
          <TextField error={errors.emailAddress != undefined} sx={{marginBottom: "8px"}} id="emailAddress" label="Email Address" variant="outlined" {...register("emailAddress", { required: true })}/>
          {errors.emailAddress && <span>This field is required</span>}
          <TextField error={errors.streetAddress != undefined} sx={{marginBottom: "8px"}} id="streetAddress" label="Street Address" variant="outlined" {...register("streetAddress", { required: true })}/>
          {errors.streetAddress && <span>This field is required</span>}
          <TextField error={errors.city != undefined} sx={{marginBottom: "8px"}} id="city" label="City" variant="outlined" {...register("city", { required: true })}/>
          {errors.city && <span>This field is required</span>}
          <TextField error={errors.state != undefined} sx={{marginBottom: "8px"}} id="state" label="State" variant="outlined" {...register("state", { required: true, minLength: 2, maxLength: 2 })}/>
          {errors.state && <span>This field is required</span>}
          <TextField error={errors.zipCode != undefined} sx={{marginBottom: "8px"}} id="zipCode" label="Zip Code" variant="outlined" {...register("zipCode", { required: true, minLength: 5, maxLength: 5})}/>
          {errors.zipCode && <span>This field is required</span>}
          {
            clients.length > 0 && 
            <>
              <FormLabel sx={{marginTop:"16px"}} id="client">Pick My Client</FormLabel>
              <Select
                labelId="client"
                value={clientId}
                placeholder="Client"
                id="client"
                {...register("clientId")}
              >
                {clients.map((client) =>
                  <MenuItem value={client.clientId}>{client.name}</MenuItem>
                )}
              </Select>
            </>
          }
          <Button sx={{marginBottom: "8px"}}variant="contained" type="submit">Submit</Button>
        </FormControl>
      </form>
    </Box>
  )
}