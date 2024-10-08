import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import store from "./store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
export const Main: React.FC = () => {
  // const [theme, colorMode] = useMode(); // Використовуємо хук useMode для отримання теми та функції зміни кольорової схеми

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<Main />);
