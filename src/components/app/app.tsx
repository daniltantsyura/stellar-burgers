import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
    <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage/>} />
        <Route path='/feed' element={<Feed/>}>
          <Route path=':number' element={<Modal title='Информация о заказе' onClose={() => {}}><OrderInfo/></Modal>}/>
        </Route>
        <Route path='/ingredients'>
          <Route path=':id' element={<Modal title='Информация об ингредиенте' onClose={() => {}}><IngredientDetails/></Modal>}/>
        </Route>
        <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login/></ProtectedRoute>}/>
        <Route path='/register' element={<ProtectedRoute><Register/></ProtectedRoute>}/>
        <Route path='/forgot-password' element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>}/>
        <Route path='/reset-password' element={<ProtectedRoute><ResetPassword/></ProtectedRoute>}/>
        <Route path='/profile' >
          <Route index element={<ProtectedRoute onlyUnAuth><Profile/></ProtectedRoute>}></Route>
          <Route path='orders' element={<ProtectedRoute ><ProfileOrders/></ProtectedRoute>}>
            <Route path=':number' element={
              <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={() => {}}>
                  <OrderInfo/>
                </Modal>
              </ProtectedRoute>
              }/>
          </Route>
        </Route>
        <Route path='*' element={<NotFound404/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;