import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import Home from './Routes/Home/home.component';
import Navigation from './Routes/Navigation/navigation.component';
import Shop from './Routes/Shop/shop.component';
import Authentication from './Routes/authentication/authentication.component'
import CheckOut from './Routes/checkout/checkout.component';
import { checkUserSession } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut/>} />
      </Route>
    </Routes>
  );
};

export default App;