import { getProducts } from "../../api/productApi";
import { useQuery } from "react-query";

// const queryClient = useQueryClient() provides access to the queryclient created in the index
// Then you can mutate values

export default function useGetProducts() {
	return useQuery("products", getProducts);
}
