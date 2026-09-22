import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const value = event.currentTarget.searchTerm.value.trim();
    navigate(value ? `/search?searchTerm=${encodeURIComponent(value)}` : '/search');
  };

  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <Link to='/' className='brand-mark'><span>Luxury</span><strong>Estate</strong></Link>
        <form className='header-search' onSubmit={handleSearch}>
          <input name='searchTerm' type='text' placeholder='Search homes, neighborhoods...' />
          <button aria-label='Search'><FaSearch /></button>
        </form>
        <nav className='site-nav'>
          <Link className='nav-link' to='/search'>Explore</Link>
          <Link className='nav-link nav-link--about' to='/about'>About</Link>
          <Link className='nav-create' to={currentUser ? '/create-listing' : '/sign-in'}><FaPlus /> List a home</Link>
          <Link to='/profile' aria-label={currentUser ? 'Open profile' : 'Sign in'}>
            {currentUser ? <img src={currentUser.avatar} alt='Profile' className='nav-avatar' /> : <span className='nav-signin'>Sign in</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}