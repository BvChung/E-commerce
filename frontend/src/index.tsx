import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { OrderProvider } from "./context/OrderProvider";
import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<CartProvider>
				<OrderProvider>
					<App />
					<ReactQueryDevtools initialIsOpen />
				</OrderProvider>
			</CartProvider>
		</AuthProvider>
	</QueryClientProvider>
);
