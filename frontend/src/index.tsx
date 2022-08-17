import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { CartProvider } from "./context/CartProvider";
import { OrderProvider } from "./context/OrderProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<CartProvider>
						<OrderProvider>
							<App />
							<ReactQueryDevtools initialIsOpen />
						</OrderProvider>
					</CartProvider>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</QueryClientProvider>
);
