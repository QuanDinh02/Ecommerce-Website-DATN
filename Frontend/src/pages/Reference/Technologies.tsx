import './Technologies.scss';
import { AiOutlineGithub } from 'react-icons/ai';
import { SiVercel } from 'react-icons/si';

const Technologies = () => {
    return (
        <div className="technologies-container min-h-screen bg-gray-100 text-black p-5 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className='flex items-center space-x-5 mb-10'>
                    <a href="https://react.dev/" target="_blank" className="w-20 h-20 rounded-full">
                        <img src="/src/assets/static/react.svg" alt="" className="w-full h-full react-logo" />
                    </a>
                    <div className='plus'> + </div>
                    <a href="https://tailwindcss.com/" target="_blank" className="w-28 h-20 rounded-full">
                        <img src="/src/assets/static/tailwind.png" alt="" className="w-full h-full" />
                    </a>
                    <div className='plus'> + </div>
                    <a href="https://dev.to/bhatvikrant/how-to-setup-redux-with-react-2020-cdj" target="_blank" className='w-20 h-20 rounded-full'>
                        <img src="/src/assets/static/redux.svg" alt="" className='w-full h-full redux-logo' />
                    </a>
                    <div className='plus'> + </div>
                    <a href="https://vitejs.dev/" target="_blank" className='w-20 h-20 rounded-full'>
                        <img src="/src/assets/static/vite.svg" alt="" className='w-full h-full vite-logo' />
                    </a>
                    <div className='plus'> + </div>
                    <div><AiOutlineGithub color={"black"} className='w-20 h-20 rounded-full' /></div>
                    <div className='plus'> + </div>
                    <a href="https://vercel.com/" target="_blank" className='w-20 h-20 rounded-full border border-black rounded-full flex items-center justify-center p-4 bg-black pb-6'><SiVercel color={"white"} className='w-16 h-16' /></a>
                </div>
                <div className='flex items-center space-x-5 group'>
                    <div className="text-5xl font-semibold group-hover:text-cyan-400 brand text-black transition duration-700 group-hover:scale-105">ECOMMERCE-WEBSITE</div>
                </div>
            </div>
        </div>
    )
}

export default Technologies;