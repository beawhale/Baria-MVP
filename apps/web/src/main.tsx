
import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { createWebAppStore } from "@store"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./index.css"
import Shell from "./shell/Shell"
import Home from "./screens/home/Home"
import Login from "./screens/auth/Login"
const { store, persistor } = createWebAppStore()
const router = createBrowserRouter([
  { path: "/", element: <Shell />, children: [{ index: true, element: <Home /> }, { path: "login", element: <Login /> }] }
])
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
