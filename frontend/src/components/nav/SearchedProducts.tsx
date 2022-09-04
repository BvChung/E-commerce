import { ProductInfo } from "../../interfaces/productInterface";
import { Link } from "react-router-dom";

export default function SearchedProducts({
	_id,
	name,
	setSearchText,
	setOpenSearch,
}: ProductInfo) {
	if (_id === "") {
		console.log("none");
	}
	return (
		<Link
			to={`/products/${_id}`}
			onClick={() => {
				setSearchText!("");
				setOpenSearch!(false);
			}}
			className="flex items-center justify-between p-3 border-b-[1px] border-l-[1px] border-r-[1px] hover:bg-gray-200 first:rounded-t-lg first:border-t-[1px]  last:rounded-b-lg "
		>
			<span>{name}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-5 h-5"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
				/>
			</svg>
		</Link>
	);
}
