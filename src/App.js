import './App.css';
import Layout from "./components/layout/Layout"
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NoPage from './components/notfound/NoPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SendMessage from './components/messages/SendMessage';
import { useContext, useEffect } from 'react';
import { tokenContext } from './context/tokenContext';
import ProtectedRouter from './components/protectedRouter/ProtectedRouter';
const route = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { path: 'profile', element: <ProtectedRouter><Profile /></ProtectedRouter> },
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'SendMessage/:userId', element: <SendMessage /> },
    ]
  },
  { path: '*', element: <NoPage /> },
])

function App() {

  let { setToken } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
  }, [])
  return (
    <>
      <RouterProvider router={route}>

      </RouterProvider>
    </>
  );
}

export default App;
