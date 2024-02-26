import { useRouteError } from "react-router-dom";
import { GoAlertFill } from 'react-icons/go';

const ErrorPage = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-5">
            <div><GoAlertFill className="w-20 h-20 text-red-600"/></div>
            {/* <h1 className="font-bold text-3xl">Oops!</h1> */}
            <p className="text-3xl font-bold">404 PAGE NOT FOUND !</p>
            {/* <p className="font-semibold">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-400">
                <i>{error.statusText || error.message}</i>
            </p> */}
        </div>
    );
}

export default ErrorPage;