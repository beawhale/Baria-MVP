import { createBrowserRouter, Navigate } from "react-router-dom"
import Shell from "./Shell"
import AppError from "./AppError"

import Home from "../screens/home/Home"
import Login from "../screens/auth/Login"
import Chats from "../screens/chats/Chats"
import Contacts from "../screens/contacts/Contacts"
import Settings from "../screens/settings/Settings"
import Chat from "../screens/chat/Chat"

export const router = createBrowserRouter([
  {
    element: <Shell />,
    errorElement: <AppError />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "chats", element: <Chats /> },
      { path: "contacts", element: <Contacts /> },
      { path: "settings", element: <Settings /> },
       { path: "chat/:id", element: <Chat /> }, 
      { path: "*", element: <Navigate to="/chats" replace /> }
    ]
  }
])
