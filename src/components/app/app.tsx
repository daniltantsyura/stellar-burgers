import { ConstructorPage, Feed, ForgotPassword, Login, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConstructorPage/>} />
        <Route path='/feed'>
          <Route index element={<Feed/>}/>
          <Route path=':number' element={<Modal title='Информация о заказе' onClose={() => {}}><OrderInfo/></Modal>}/>
        </Route>
        <Route path='/ingredients'>
          <Route path=':id' element={<Modal title='Информация об ингредиенте' onClose={() => {}}><IngredientDetails/></Modal>}/>
        </Route>
        <Route path='/orders' element={<ProfileOrders/>}>
          <Route path=':number' element={<Modal title='Информация о заказе' onClose={() => {}}><OrderInfo/></Modal>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
