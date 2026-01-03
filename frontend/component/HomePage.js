import React, {useEffect} from 'react'
import Contant from './Contant';
import Footer from './Footer';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [auth , setAuth] = useAuth();
  useEffect(() => {
    if (auth.user == null) {
      navigate("/form");
    }
  }, [auth.user, navigate]);
  console.log(auth);
  const data = auth.user;
  return (
    <>
    <Contant />
   
    <Footer />
    </>
  )
}

export default HomePage;