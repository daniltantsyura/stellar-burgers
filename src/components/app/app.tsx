import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
        <AppHeader />
        <Routes >
          <Route path='/' element={<ConstructorPage />}>
            <Route path='/ingredients/:id' element={<Modal title='Информация об ингредиенте' onClose={() => {navigate(-1)}}><IngredientDetails /></Modal>} />
          </Route>
          <Route path='/feed' element={<Feed />}>
            <Route path=':number' element={<Modal title='Информация о заказе' onClose={() => {navigate(-1)}}><OrderInfo /></Modal>} />
          </Route>
          <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
          <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
          <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
          <Route path='/profile' >
            <Route index element={<ProtectedRoute onlyAuth><Profile /></ProtectedRoute>}></Route>
            <Route path='orders' element={<ProtectedRoute onlyAuth><ProfileOrders /></ProtectedRoute>}>
              <Route path=':number' element={
                <ProtectedRoute>
                  <Modal title='Информация о заказе' onClose={() => {navigate(-1)}}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              } />
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
    </div>
  )
};

export default App;