import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router'
import Users from './Users.jsx'
import UserId from './userId.jsx'
import ThemeContextProvider from './context/themeContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <ThemeContextProvider /> */}
        <Routes>
          <Route path='/' element={<App/>}/>
          {/* <Route path='/user' element={<Users/>}/> */}
          {/* <Route path='/user/:id' element={<UserId/>}/> */}

        </Routes>
        {/* </ThemeContextProvider> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)