import { useSelector, useDispatch } from "react-redux";
import { increaseCounter, decreaseCounter } from "@/redux/actions/action";

const ReduxTesting = () => {

    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increaseCounter());
    };

    const handleDecrement = () => {
        dispatch(decreaseCounter());
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-800 p-5'>
            <div className="flex flex-col items-center">
                <div className='text-5xl text-white font-semibold mb-10'>Count: {count}</div>
                <div className='mt-5 onClick={} space-x-3'>
                    <button className='px-8 py-3 border-2 border-gray-500 hover:bg-gray-50 hover:text-black rounded-md text-3xl text-white' onClick={() => handleIncrement()}>Increase</button>
                    <button className='px-8 py-3 border-2 border-gray-500 hover:bg-gray-50 hover:text-black rounded-md text-3xl text-white' onClick={() => handleDecrement()}>Decrease</button>
                </div>
            </div>
        </div>
    )
}

export default ReduxTesting;