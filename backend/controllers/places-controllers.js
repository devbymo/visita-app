const uui = require('uuid');

const HttpError = require('../models/http-error');
const isInputDataValid = require('../utils/isInputsValid');
const getCoordinates = require('../utils/getCoordinates');

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

const validateGetPlaceByIdInputs = async (req, res, next) => {
  const { placeId } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  // Check if place exists.
  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  // Forward the place.
  req.place = place;
  next();
};

const getPlaceById = async (req, res, next) => {
  res.status(200).json({ place: req.place });
};

const validateGetPlacebyUserIdInputs = async (req, res, next) => {
  const { userId } = req.params;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  // Check if there is 1 place at least.
  if (places.length < 1 || !places) {
    return next(new HttpError('Places not found!', 404));
  }

  // Forward user's places.
  req.places = places;
  next();
};

const getPlacesByUserId = async (req, res, next) => {
  res.status(200).json({ places: req.places });
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
  if (!address || !description || !title || !creator) {
    return next(
      new HttpError(
        `Missing required inputs [address, description, title, creator]!`,
        400
      )
    );
  }

  // Check coordinates.
  let generatedCoordinatesUsingPassedTitle = {
    lat: 0,
    lng: 0,
  };
  if (!coordinates) {
    try {
      // Generate coordinates.
      generatedCoordinatesUsingPassedTitle = await getCoordinates(address);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Create the place.
  const newPlace = {
    id: uui.v4(),
    title,
    address,
    description,
    coordinates: coordinates ||
      generatedCoordinatesUsingPassedTitle || { lat: 0, lng: 0 },
    rating: rating || 0,
    image,
    creator,
  };

  // Forward the place.
  req.newPlace = newPlace;
  next();
};

const createPlace = async (req, res, next) => {
  DUMMY_PLACES.unshift(req.newPlace);

  // Now newPlace is ready to be added to db.
  // ....

  res.json({
    newPlace: req.newPlace,
    allPlaces: DUMMY_PLACES,
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
  const updatedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  const updatedPlaceIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === placeId
  );

  // Check if place exists.
  if (!updatedPlace) {
    return next(new HttpError('Place not found!', 404));
  }

  req.updatedPlace = updatedPlace;
  req.placeIndex = updatedPlaceIndex;
  next();
};

const updatePlace = async (req, res, next) => {
  const { description, title } = req.body;
  if (description) {
    req.updatedPlace.description = description;
  }
  if (title) {
    req.updatedPlace.placeName = title;
  }

  // Add the updated place to the dummy places.
  DUMMY_PLACES[req.placeIndex] = req.updatedPlace;

  res.status(200).json({
    message: 'Place updated successfully.',
    updatedPlace: req.updatedPlace,
    allPlaces: DUMMY_PLACES,
  });
};

const validateDeletePlaceInputs = async (req, res, next) => {
  const { placeId } = req.params;

  // Find the place.
  const removedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  const removedPlaceIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === placeId
  );

  // Check if place exists.
  if (!removedPlace) {
    return next(new HttpError('Place not found!', 404));
  }

  // Forward the founded place.
  req.removedPlace = removedPlace;
  req.removedPlaceIndex = removedPlaceIndex;
  next();
};

const deletePlace = async (req, res, next) => {
  // Remove the place from the dummy places.
  DUMMY_PLACES.splice(req.removedPlaceIndex, 1);
  // OR
  // DUMMY_PLACES = DUMMY_PLACES.filter((place) => removedPlace.id !== place);

  res
    .status(200)
    .json({ message: 'Place deleted successfuly.', allPlaces: DUMMY_PLACES });
};

module.exports = {
  getPlaceById,
  validateGetPlaceByIdInputs,
  getPlacesByUserId,
  validateGetPlacebyUserIdInputs,
  createPlace,
  validateCreatePlaceInputs,
  updatePlace,
  validateUpdatePlaceInputs,
  deletePlace,
  validateDeletePlaceInputs,
};
