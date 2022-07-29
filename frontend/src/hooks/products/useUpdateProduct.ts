import { updateProducts } from "../../api/productApi";
import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "react-query";

export default function useUpdateProducts() {
	const queryClient = useQueryClient();

	return useMutation(updateProducts, {
		onSuccess: (data) => {
			toast.success("User logged in");
			queryClient.invalidateQueries("products");
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
}
