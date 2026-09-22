import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// 1. Create Listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// 2. Delete Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

// 3. Update Listing API Route (07:09:14)
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// 4. Get Single Listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const { searchTerm = '', type = 'all', parking, furnished, offer, sort = 'createdAt', order = 'desc', startIndex = 0, limit = 9 } = req.query;
    const filters = {};
    if (searchTerm.trim()) filters.$or = [{ name: { $regex: searchTerm.trim(), $options: 'i' } }, { address: { $regex: searchTerm.trim(), $options: 'i' } }];
    if (type !== 'all') filters.type = type;
    if (parking === 'true') filters.parking = true;
    if (furnished === 'true') filters.furnished = true;
    if (offer === 'true') filters.offer = true;
    const sortField = sort === 'regularPrice' ? 'regularPrice' : 'createdAt';
    const listings = await Listing.find(filters).sort({ [sortField]: order === 'asc' ? 1 : -1 }).skip(Number(startIndex)).limit(Math.min(Number(limit), 24));
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};