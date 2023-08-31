import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Home, Users, User, NewUser, Products, Product, NewProduct, Login, Register, ToBeCreated } from './pages'
import { AppWrapper } from './wrapper'
import { useSelector } from 'react-redux'

const App = () => {

  const { currentUser } = useSelector(state => state.user)


  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/login' />
  }

  return (
    <div className='w-screen h-screen overflow-hidden ' >

      <Routes>
        <Route path='/login' element={currentUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={currentUser ? <Navigate to='/' /> : <Register />} />
        <Route path='/' exact element={<RequireAuth><AppWrapper Component={Home} /></RequireAuth>} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/users' element={<RequireAuth><AppWrapper Component={Users} /></RequireAuth>} />
        <Route path='/user/:id' element={<RequireAuth><AppWrapper Component={User} /></RequireAuth>} />
        <Route path='/newUser' element={<RequireAuth><AppWrapper Component={NewUser} /></RequireAuth>} />
        <Route path='/products' element={<RequireAuth><AppWrapper Component={Products} /></RequireAuth>} />
        <Route path='/product/:id' element={<RequireAuth><AppWrapper Component={Product} /></RequireAuth>} />
        <Route path='/newProduct' element={<RequireAuth><AppWrapper Component={NewProduct} /></RequireAuth>} />
        <Route path='/analytics' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/sales' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/transactions' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/reports' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/mail' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/feedback' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/messages' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
        <Route path='/manage' element={<RequireAuth><AppWrapper Component={ToBeCreated} /></RequireAuth>} />
      </Routes>
    </div>
  )
}

export default App;