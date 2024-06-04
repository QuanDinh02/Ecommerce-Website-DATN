; import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import 'swiper/css';
import "react-datepicker/dist/react-datepicker.css";

const System = () => {

  return (
    <div>
      <Outlet />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default System