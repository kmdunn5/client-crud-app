export interface Address {
  streetAddress: string // does this address become it's own object?
  city: string
  state: string //Could be an enum of state abbreviations if I want
  zipCode: string
}