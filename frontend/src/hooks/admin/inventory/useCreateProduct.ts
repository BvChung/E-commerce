import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ProductInfo,
	ProductCreation,
} from "../../../interfaces/productInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const createProduct = async (productData: ProductCreation) => {
		try {
			const response = await eCommerceApiPrivate.post(
				"/api/products/",
				productData
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(createProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries("products");
			toast.success(`${data.name} has been created.`);
		},
	});
};
