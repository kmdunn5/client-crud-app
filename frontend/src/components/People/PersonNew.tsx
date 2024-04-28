import { Box, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useForm } from "react-hook-form"
import { BASE_URL } from "../utils/url"

export function PersonNew() {
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
      <Typography>Person Create</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <TextField id="firstName" label="First Name" variant="outlined" {...register( "firstName", { required: true } )}/>
          <TextField id="lastName" label="last Name" variant="outlined" {...register("lastName", { required: true })}/>
          <TextField id="emailAddress" label="Email Address" variant="outlined" {...register("emailAddress", { required: true })}/>
          <TextField id="streetAddress" label="Email" variant="outlined" {...register("streetAddress", { required: true })}/>
          <TextField id="city" label="City" variant="outlined" {...register("city", { required: true })}/>
          <TextField id="state" label="State" variant="outlined" {...register("state", { required: true })}/>
          <TextField id="zipCode" label="Zip Code" variant="outlined" {...register("zipCode", { required: true })}/>
          {errors.zipCode && <span>This field is required</span>}
          {/* <Button variant="outlined">Submit</Button> */}
          <input type="submit" />
        </Grid>
      </form>
    </Box>
  )
}