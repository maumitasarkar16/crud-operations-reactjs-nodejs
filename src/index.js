import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { BrowserRouter, Routes, Route} from "react-router-dom";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import List from './components/List';
import Form from './components/Form';
import EditForm from './components/EditForm';

const appRouter = createBrowserRouter([
  {
          path: "/",
          element: <App />,
          children: [
                  {
                          path: "/",
                          element: <Form />
                  },
                  {
                          path: "/list",
                          element: <List />
                  },
                  
                  {
                          path: "/editFormData/:formId",
                          element: <EditForm />
                  }
          ],
          
  },

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>  
)


// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<App />} />
//         <Route path='/list' element={<List />} />
//       </Routes>
//     </BrowserRouter> 
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
