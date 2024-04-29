import { Address } from "./Address"
import { Client } from "./Client"

export interface Person {
  personId: string
  firstName: string
  lastName: string
  emailAddress: string
  mailingAddress?: Address
  streetAddress: string // does this address become it's own object?
  city: string
  state: string //Could be an enum of state abbreviations if I want
  zipCode: string
  client: Client
}