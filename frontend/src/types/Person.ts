import { Address } from "./Address"

export interface Person {
  personId: string
  firstName: string
  lastName: string
  email: string
  mailingAddress?: Address
  streetAddress: string // does this address become it's own object?
  city: string
  state: string //Could be an enum of state abbreviations if I want
  zipCode: string
  // client: Client
}