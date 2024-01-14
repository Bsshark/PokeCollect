import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter/>
			</BrowserRouter>
		</Provider>
	);
};
