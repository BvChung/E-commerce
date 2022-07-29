import { deleteProducts } from "../../api/productApi";
import { useQuery, useQueryClient, UseMutationResult } from "react-query";

export default function useDeleteProducts() {
	const queryClient = useQueryClient();
}
