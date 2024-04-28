import { useParams } from "react-router-dom"

export function PersonRead() {
  const { id } = useParams()

  // useEffect(() => {
  //   // setIsLoading(true);
  //   axios
  //     .get(`${BASE_URL}/persons/${id}`)
  //     .then((response) => {
  //       setProduct(response.data);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [productId]);

  return (
    <div></div>
  )
}