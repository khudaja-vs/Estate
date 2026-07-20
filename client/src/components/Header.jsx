import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const avatarUrl = currentUser?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <header className='bg-slate-200 shadow-nd'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
        <Link to='/' >
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Sahand</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
        </Link>
        <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='focus:outline-none w-24 sm:w-64' />
           <FaSearch className='text-slate-600 mr-2' />
                
        </form>
        <ul className='flex gap-4 '>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
            </Link>
            
            <Link to='/sign-in'> 
            {currentUser ?(
                <img src={avatarUrl} alt='profile' className='rounded-full h-8 w-8 object-cover'/>
            ): <li className='sm:inline text-slate-700 hover:underline'> {' '}
                Sign in</li>
            }
            
            </Link>

        </ul>
        </div>
    </header>
  )
}
