import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  const price = listing.offer ? listing.discountPrice : listing.regularPrice;

  return (
    <Link to={`/listing/${listing._id}`} className='listing-card group'>
      <div className='listing-card__image-wrap'>
        <img
          src={listing.imageUrls?.[0]}
          alt={listing.name}
          className='listing-card__image'
          loading='lazy'
        />
        <span className='listing-card__tag'>{listing.type === 'rent' ? 'For rent' : 'For sale'}</span>
        {listing.offer && <span className='listing-card__offer'>Special offer</span>}
      </div>
      <div className='listing-card__body'>
        <div className='listing-card__price'>
          ${price?.toLocaleString('en-US')}
          {listing.type === 'rent' && <small>/month</small>}
        </div>
        <h3>{listing.name}</h3>
        <p className='listing-card__address'><FaMapMarkerAlt /> {listing.address}</p>
        <div className='listing-card__meta'>
          <span><FaBed /> {listing.bedrooms} beds</span>
          <span><FaBath /> {listing.bathrooms} baths</span>
          <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
        </div>
      </div>
    </Link>
  );
}
