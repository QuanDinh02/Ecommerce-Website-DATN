import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import 'swiper/css';

function App() {
  return (
    <div className="app">
      <Header />
        <Outlet />
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
