import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './layouts/Main';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
          path:'/',
          loader: () =>{
            return fetch('products.json');
          },
          element: <Shop></Shop>
        },
        {
          path:'orders',
          loader: productsAndCartLoader,
          /* for 19 no line a common function has been created in productsAndCartLoader named components 
          loader: ()=> {
            return fetch('products.json')
          },
           upor er line ke single line e likhle return korte hbe nah just eivabe likhte hbe r eta ke jhane nibo sekhane giye useLoaderData ke call korbo orders page er 

          loader: ()=> fetch('products.json')
          */
          element: <Orders></Orders>
        },
        {
          path:'inventory',
          element: <Inventory></Inventory>
        },
        {
          path:'about',
          element: <About></About>
        }
      ]
    },
    
  ]);
  return (
    <div>
      <RouterProvider
        router={router}
      ></RouterProvider>
    </div>
  );
}

export default App;
