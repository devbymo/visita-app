const uui = require('uuid');

const HttpError = require('../models/http-error');
const isInputDataValid = require('../utils/isInputsValid');

const DUMMY_PLACES = [
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
    location: {
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
    location: {
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
    location: {
      lat: 55.6761,
      lng: 12.5683,
    },
    rating: 1.5,
    creator: 'user2',
  },
];

const getPlaceById = async (req, res, next) => {
  console.log(`Place ID: ${req.params.placeId}`);
  const { placeId } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    return next(new HttpError('Place not found!', 404));
  }

  res.status(200).json({ place });
};

const getPlaceByUserId = async (req, res, next) => {
  const { userId } = req.params;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (places.length === 0) {
    return next(new HttpError('Places not found!', 404));
  }

  res.status(200).json({ places });
};

const createPlace = async (req, res, next) => {
  const { address, description, title, location, rating, image, creator } =
    req.body;

  // Check if there is invalid fields passed.
  const passedFields = Object.keys(req.body);
  const allowedFields = [
    'address',
    'description',
    'title',
    'location',
    'rating',
    'image',
    'creator',
  ];
  const isValid = isInputDataValid(passedFields, allowedFields);
  if (!isValid) {
    return next(
      new HttpError(
        `Not allowed fields passed, allowed fields: [${allowedFields}]!`,
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

  const newPlace = {
    id: uui.v4(),
    title,
    address,
    description,
    coordinates: location || { lat: 0, lng: 0 },
    rating: rating || 0,
    image,
    creator,
  };

  DUMMY_PLACES.push(newPlace);

  // Now newPlace is ready to be added to db.
  // ....

  res.json({
    newPlace,
    allPlaces: DUMMY_PLACES,
  });
};

module.exports = {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
};
