import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyDashboard from "./pages/MyDashboard";
import MapView from "./pages/MapView";
import OlaDemoPage from "./pages/OlaDemoPage";
import AllAvailableRides from "./components/AllAvailableRides";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/reactQuery/queryClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ola",
    element: <OlaDemoPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: <MyDashboard />,
  },
  {
    path: "/map",
    element: <MapView />,
  },
  {
    path: "/allRides",
    element: <AllAvailableRides />,
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
   </QueryClientProvider>
);
