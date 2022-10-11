import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { CartProvider } from "./context/CartProvider";
import { OrderProvider } from "./context/OrderProvider";
import { appRouter } from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<AuthProvider>
				<CartProvider>
					<OrderProvider>
						<RouterProvider router={appRouter} />
						<ReactQueryDevtools initialIsOpen />
					</OrderProvider>
				</CartProvider>
			</AuthProvider>
		</ThemeProvider>
	</QueryClientProvider>
);
