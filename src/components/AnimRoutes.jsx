import React from 'react';

//import pages
import Home from '../pages/Home';
import Wedding from '../pages/Wedding';
import Daily from '../pages/Daily';
import All from '../pages/All';

//import routes route  & usrLocation hook
import {Routes, Route, useLocation} from 'react-router-dom'

const AnimRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/wedding' element={<Wedding />} />
      <Route path='/daily' element={<Daily />} />
      <Route path='/all' element={<All />} />
    </Routes>
  );
};

export default AnimRoutes;
