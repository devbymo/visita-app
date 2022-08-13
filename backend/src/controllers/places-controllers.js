const uui = require('uuid');

const HttpError = require('../models/http-error');
const isInputDataValid = require('../utils/isInputsValid');
const getCoordinates = require('../utils/getCoordinates');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: '1',
    imageURL:
      'https://media.istockphoto.com/photos/paris-aerial-panorama-with-river-seine-and-eiffel-tower-france-picture-id1336449613?b=1&k=20&m=1336449613&s=170667a&w=0&h=atFJsGNEMuHaPll6bRwOkZl8Q0Iz83EcUUi0SvhAeM8=',
    placeName: 'Paris',
    description:
      'Paris is one of the most beautiful cities in the world. It is known worldwide for the Louvre Museum, Notre-Dame cathedral, and the Eiffel tower. It has a reputation of being a romantic and cultural city. The city is also known for its high-quality gastronomy and the terraces of its cafés',
    address: {
      country: 'France',
      city: 'Paris',
    },
    coordinates: {
      lat: 48.8566,
      lng: 2.3522,
    },
    rating: 4.5,
    creator: 'user1',
  },
  {
    id: '2',
    imageURL:
      'https://media.istockphoto.com/photos/shore-of-alexandria-egypt-picture-id157316325?b=1&k=20&m=157316325&s=170667a&w=0&h=qIojlEvA4WbM-LTXhInTzN-kEKGqb7S1uWmqtLC2wwY=',
    placeName: 'Alexandria',
    description:
      'One of Egypts largest cities, Alexandria is also its principal seaport and a major industrial centre. The city lies on the Mediterranean Sea at the western edge of the Nile River delta, about 114 miles (183 km) northwest of Cairo in Lower Egypt. Area city, 116 square miles',
    address: {
      country: 'Egypt',
      city: 'Alexandria',
    },
    coordinates: {
      lat: 31.2001,
      lng: 29.9187,
    },
    rating: 0,
    creator: 'user1',
  },
  {
    id: '3',
    imageURL:
      'https://media.istockphoto.com/photos/nyhavn-copenhagen-denmark-picture-id901375804?b=1&k=20&m=901375804&s=170667a&w=0&h=SjhoV9MfiKSfJ4JVT7y62sfjlpq-OUqfjEhJwMlZQTY=',
    placeName: 'Copenhagen',
    description:
      'Copenhagen is a unique city, characterized by its canals, cycling culture, strong economy, and happy locals. It is actually known as being the happiest city in the world, due to its shorter workdays, free college tuition, more vacation days, and levels of personal interaction.',
    address: {
      country: 'Denmark',
      city: 'Copenhagen',
    },
    coordinates: {
      lat: 55.6761,
      lng: 12.5683,
    },
    rating: 1.5,
    creator: 'user2',
  },
];

// =================
// For Testing purposes.
// =================
const getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find places.',
      500
    );
    return next(error);
  }
  res.json({ places });
};

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;

  // Find the place.
  try {
    const place = await Place.findOne({ _id: placeId });

    // Check if the place exists.
    if (!place) {
      return next(
        new HttpError('Could not find place for the provided id.', 404)
      );
    }
    res.status(200).json({ place });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  // Find the places.
  try {
    const places = await Place.find({ creator: userId });

    // Check if the places exists.
    if (places.length === 0) {
      return next(
        new HttpError('Could not find places for the provided user id.', 404)
      );
    }

    res.status(200).json({ places });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const validateCreatePlaceInputs = async (req, res, next) => {
  const { address, description, title, coordinates, rating, image, creator } =
    req.body;

  // Check if there is invalid fields passed.
  const passedFields = Object.keys(req.body);
  const allowedFields = [
    'address',
    'description',
    'title',
    'coordinates',
    'rating',
    'image',
    'creator',
  ];
  const isValid = isInputDataValid(passedFields, allowedFields);
  if (!isValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedFields}]!`,
        400
      )
    );
  }

  // Check the required inputs.
  if (!address || !description || !title || !creator || !image) {
    return next(
      new HttpError(
        `Missing required inputs [address, description, title, creator, image]!`,
        400
      )
    );
  }

  // Check coordinates.
  let autoGeneratedCoordinates = {
    lat: 0,
    lng: 0,
  };
  if (!coordinates) {
    try {
      // Generate coordinates.
      autoGeneratedCoordinates = await getCoordinates(address);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Create the place.
  const newPlace = {
    title: title.trim(),
    address,
    description: description.trim(),
    coordinates: coordinates || autoGeneratedCoordinates,
    rating: rating || 0,
    image,
    creator,
  };

  // Forward the place.
  req.newPlace = newPlace;
  next();
};

const createPlace = async (req, res, next) => {
  // Create the place.
  const { newPlace } = req;
  const createdPlace = new Place(newPlace);

  // Save the place.
  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.json({
    message: 'Place created successfully!',
    createdPlace,
  });
};

const validateUpdatePlaceInputs = async (req, res, next) => {
  const { placeId } = req.params;

  // Check if there is invalid fields passed.
  const passedUpdates = Object.keys(req.body);
  const allowedUpdates = ['description', 'title'];
  const isValid = isInputDataValid(passedUpdates, allowedUpdates);
  if (!isValid) {
    return next(
      new HttpError(
        `Not allowed updates passed, allowed updates: [${allowedUpdates}]!`,
        400
      )
    );
  }

  // Find the place.
  try {
    const place = await Place.findById(placeId);
    // Check if place exists.
    if (!place) {
      return next(new HttpError('Place not found!', 404));
    }
    // Forward the place.
    req.placeToUpdate = place;
    next();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updatePlace = async (req, res, next) => {
  let { description, title } = req.body;
  let { placeToUpdate } = req;

  discription = description.trim();
  title = title.trim();

  // Update the place.
  if (description.length > 0) {
    placeToUpdate.description = description;
  }
  if (title.length > 0) {
    placeToUpdate.title = title;
  }

  // Save the place.
  try {
    await placeToUpdate.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(200).json({
    message: 'Place updated successfully.',
    updatePlace: placeToUpdate,
  });
};

const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;

  // Find the place.
  try {
    const place = await Place.findOneAndDelete({ _id: placeId });
    // Check if place exists.
    if (!place) {
      return next(new HttpError('Place not found!', 404));
    }

    // Delete the place.

    res
      .status(200)
      .json({ message: 'Place deleted successfuly.', deletePlace: place });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  validateCreatePlaceInputs,
  updatePlace,
  validateUpdatePlaceInputs,
  deletePlace,
};
