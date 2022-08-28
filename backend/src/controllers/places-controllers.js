const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const isInputDataValid = require('../utils/isInputsValid');
const getCoordinates = require('../utils/getCoordinates');
const Place = require('../models/place');
const User = require('../models/user');

// ======================
// For Testing purposes.
// ======================
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

// ======================
// For Testing purposes.
// ======================
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
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;

  // Find the place.
  let place;
  try {
    place = await Place.findOne({ _id: placeId });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if the place exists.
  if (!place) {
    return next(
      new HttpError('Could not find place for the provided id.', 404)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  // Find the places.
  // let places;
  // try {
  //   places = await Place.find({ creator: userId });
  // } catch (error) {
  //   return next(new HttpError(error.message, 500));
  // }

  // OR using the populate method.
  let placesCreatedByUser;
  try {
    placesCreatedByUser = await User.findOne({ _id: userId }).populate(
      'places'
    );
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if the places exists.
  if (!placesCreatedByUser || placesCreatedByUser.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.status(200).json({
    places: placesCreatedByUser.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const validateCreatePlaceInputs = async (req, res, next) => {
  // Add image to the body if it is not provided.
  req.body.image = req.file.path
    ? `${req.file.destination}/${req.file.filename}`
    : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
  const { address, description, title, rating, image, creator } = req.body;
  let { lat, lng } = req.body;
  let coordinates = {
    lat,
    lng,
  };

  // Check if there is invalid fields passed.
  const passedFields = Object.keys(req.body);
  const allowedFields = [
    'address',
    'description',
    'title',
    'lat',
    'lng',
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
        `Missing inputs! required inputs: [address, description, title, creator, image]`,
        400
      )
    );
  }

  // Check if user id is valid.
  let user;
  try {
    user = await User.findOne({ _id: creator });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  if (!user) {
    return next(new HttpError('Could not find user for the provided id!', 404));
  }

  // Check coordinates.
  if (+lat === 0 || +lng === 0) {
    try {
      // Generate coordinates.
      coordinates = await getCoordinates(title);
    } catch (err) {
      // If there is an error generating coordinates we will use the default coordinates.
      console.log(err.message);
    }
  }

  // Create the place.
  const newPlace = {
    title: title.trim(),
    address,
    description: description.trim(),
    coordinates: coordinates || {
      lat: 31.2001,
      lng: 29.9187,
    },
    rating: rating || 1,
    image,
    creator,
  };

  // Forward the place to be created.
  req.newPlace = newPlace;
  req.user = user;
  next();
};

const createPlace = async (req, res, next) => {
  // Create the place.
  const { newPlace, user } = req;
  const createdPlace = new Place(newPlace);

  // Now we want to save the place & add new created place id to the user's places.
  // And if one of the above steps fails, we want to end the session without saving the place. [if one fails undo all]
  // How to do this?
  // using transaction & session.
  // transaction is a way to run multiple operations in one session.
  try {
    // Begin the transaction & session.
    const session = await mongoose.startSession();
    session.startTransaction();

    // 1) Save the place.
    await createdPlace.save({ session });

    // 2) Add the place id to the user.
    user.places.push(createdPlace.id);
    await user.save({ session });

    // Commit the transaction.
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError(
        error.message || 'Creating place faild, please try again.',
        500
      )
    );
  }

  res.json({
    message: 'Place created successfully!',
    createdPlace: createdPlace.toObject({ getters: true }),
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
  let place;
  try {
    place = await Place.findOne({ _id: placeId });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if place exists.
  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  // Forward the place to be updated.
  req.placeToUpdate = place;
  next();
};

const updatePlace = async (req, res, next) => {
  let { description, title } = req.body;
  let { placeToUpdate } = req;

  // Clean the inputs.
  discription = description.trim();
  title = title.trim();

  // Update the place.
  if (discription && description.length !== 0) {
    placeToUpdate.description = description;
  }
  if (title && title.length !== 0) {
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
    updatePlace: placeToUpdate.toObject({ getters: true }),
  });
};

const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;

  // Find the place.
  let place;
  try {
    place = await Place.findOne({ _id: placeId }).populate('creator');
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Check if place exists.
  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  // Delete the place from the user's places.
  // Using transaction & session.
  try {
    // Begin the transaction.
    const session = await mongoose.startSession();
    session.startTransaction();

    // Delete the place.
    await place.remove({ session });

    // Delete the place id from the user.
    // To do this step you should populate the user id (creator).
    place.creator.places.pull(placeId);

    // Save the user.
    await place.creator.save({ session });

    // Commit the transaction.
    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  res.status(200).json({
    message: 'Place deleted successfuly.',
  });
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
