import './App.css'
import { HomePage } from './Components/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './Components/Main';



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path:'/main',
    element: <Main/>
  }
])

function App() {

  return (
    <>
    <RouterProvider router={appRouter}>
    </RouterProvider>
    </>
  )
}

export default App
