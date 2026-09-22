import { useEffect, useState } from 'react';
import { FaArrowRight, FaCheck, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetch('/api/listing/get?limit=3')
      .then((res) => {
        if (!res.ok) throw new Error('Unable to load listings');
        return res.json();
      })
      .then((data) => setListings(Array.isArray(data) ? data : []))
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className='hero-section'>
        <div className='hero-section__content'>
          <p className='eyebrow'>A better way home</p>
          <h1>Find a place<br /><em>to belong.</em></h1>
          <p className='hero-section__intro'>Thoughtfully selected homes in neighborhoods you will love. Start exploring with confidence.</p>
          <form className='hero-search' action='/search'><FaSearch /><input name='searchTerm' placeholder='City, neighborhood, or address' /><button>Explore homes <FaArrowRight /></button></form>
          <div className='hero-proof'><span><FaCheck /> Curated listings</span><span><FaCheck /> Local insights</span><span><FaCheck /> No pressure</span></div>
        </div>
        <div className='hero-section__visual'><div className='hero-section__caption'><strong>Sunday light</strong><span>Juniper House, Portland</span></div></div>
      </section>
      <section className='home-section'>
        <div className='section-heading'><div><p className='eyebrow'>Fresh on the market</p><h2>Homes worth<br /><em>coming home to.</em></h2></div><Link to='/search' className='text-link'>View all homes <FaArrowRight /></Link></div>
        {loading ? <div className='empty-feature'><p>Finding fresh homes for you...</p></div> : listings.length > 0 ? <div className='listing-grid'>{listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}</div> : <div className='empty-feature'><p>{apiError ? 'Listings are temporarily unavailable. You can still explore the marketplace.' : 'No listings yet. Be the first to list a home.'}</p><Link to={apiError ? '/search' : '/create-listing'}>{apiError ? 'Try marketplace' : 'List a home'} <FaArrowRight /></Link></div>}
      </section>
      <section className='closing-banner'><div><p className='eyebrow'>Make your next move</p><h2>Your place is<br /><em>out there.</em></h2></div><Link to='/search' className='banner-button'>Start exploring <FaArrowRight /></Link></section>
    </main>
  );
}
