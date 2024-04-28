import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Person } from "../../types/Person"
import { BASE_URL } from "../utils/url"

export function PersonRead() {
  const { id } = useParams()
  const [person, setPerson] = useState<Person>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/person/${id}`)
      .then((response) => {
        setPerson(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // do read/edit/create from this?
  return (
    <div></div>
  )
}