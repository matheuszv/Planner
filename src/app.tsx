import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTrip } from "./pages/create-trip/index.tsx"
import { DetailsTrip } from "./pages/details-trip/index.tsx"

const router = createBrowserRouter([
  { path: "/",
    element: <CreateTrip /> ,
  },
  { path: "/trips/:tripId",
    element: <DetailsTrip /> ,
  },
])

export function App() {
  
  return (
    <RouterProvider router={router} />
  ) 
}
           