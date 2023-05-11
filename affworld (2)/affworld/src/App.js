// Basic Imports
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.css';
import loadingImg from './img/ball-triangle.svg'
// import 'react-flags-select/css/react-flags-select.css';

// Components {IMPORT THE COMPOENENTS HERE}
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Containers/Home';
// import Footer from './Components/Footer';

// CSS Imports for packages
import 'react-toastify/dist/ReactToastify.css';
import Login from './Containers/Login';
import Dashboard from './Containers/admin/Dashboard';
import Offers from './Containers/affiliates/Offers';
import OfferList from './Containers/affiliates/Offers/offer';
import Wallet from './Containers/affiliates/Wallet';
import ProfilePersonal from './Containers/affiliates/profile/personal';
import ProfileBilling from './Containers/affiliates/profile/billing';

// Lazy Load Component
const Signup = lazy(() => import('./Containers/Signup'));



function App() {

  const location = useLocation();

  useEffect(() => {
    // Scroll top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  // const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  useEffect(() => {
  //   if(!auth.authenticate){
  //     dispatch(isLoggedin())
  //   }
  // if(auth.user == null) {
  //   redirect('/user/login')
  // }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user])

  return (
    <div className="App">
      {auth.user ? <Sidebar></Sidebar>: <Navbar></Navbar>}
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Suspense fallback={
        <div className="divLoader">
            <img src={loadingImg} alt="Loading" />
        </div>}>
      <Routes>
        {/* ADD ALL THE ROUTES HERE */}
      <Route path='/' element={<Home />} />
        {/* <Route exact path='/service' component={Services} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} /> */}
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/affiliate/dashboard' element={<Dashboard />} />
        <Route path='/affiliate/offers' element={<Offers />} />
        <Route path='/affiliate/offers/1' element={<OfferList />} />
        <Route path='/affiliate/wallet' element={<Wallet />} />
        <Route path='/affiliate/profile/personal' element={<ProfilePersonal />} />
        <Route path='/affiliate/profile/billing' element={<ProfileBilling />} />
        {/* <Route exact path='/user/login' component={Login} /> */}
        {/* <Route exact path='/user/signup' component={Signup} /> */}
        {/* <Route exact path='/team' component={Team} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/testimonial" component={Testimonials} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/blogs" component={Blog} />
        <Route exact path="/blog/:blogId/:blogslug" component={BlogPg} />
        <Route exact path="/blogs/user/:userId/:username" component={UserBlogPage} />
        <Route exact path="/blogs/category/:categoryId/:categoryslug" component={CategoryBlogsPage} />
        <Route exact path="/quote" component={Quote} />
        <Route exact path="/tiny" component={TinyMce} />
        <Route component={ErrorPage} /> */}
      </Routes>
      </Suspense>
      {/* <Footer />
      <WhatsAppIcon />
      <Rocket />  */}
      <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
      />
    </div>
  );
}

export default App;
