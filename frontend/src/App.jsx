import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import BookList from "./components/BookList"
import Page from "./layout/page";
import BookDetails from "./components/BookDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Page/>}>
      <Route index element={<BookList />}></Route>
      <Route path="/books/:id" element={<BookDetails />}></Route>
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;