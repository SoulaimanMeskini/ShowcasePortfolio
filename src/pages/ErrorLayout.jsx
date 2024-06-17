import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import ErrorPage from "../components/Error";

const ErrorLayout = () => {
  return (
    <>
      <Header /> 
      <ErrorPage />  
      <Footer/>
    </>
  );
};

export default ErrorLayout;
