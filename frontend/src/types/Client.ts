import { Address } from "./Address"

export interface Client {
  clientId: string
  name: string
  websiteURI: string
  phoneNumber: string
  mailingAddress?: Address
  streetAddress: string
  city: string
  state: string
  zipCode: string
  // contacts: Person[]
}