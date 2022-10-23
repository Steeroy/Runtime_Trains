import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Siyanda',
      email: 'siyanda@admin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Stilo',
      email: 'stilo@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  trains: [
    {
      name: '400 Explora',
      slug: '400-Explora',
      imgUrl: '/images/400_explora.jpg',
      price: 560,
      stations: ['Bellville', 'Claremont', 'Crawford'],
      times: ['14:00', '20:00'],
      numReviews: 15,
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 625,
      type: 'Premium',
    },
    {
      name: 'Atlantic Limited',
      slug: 'Atlantic-Limited',
      imgUrl: '/images/atlantic_limited.jpg',
      price: 480,
      stations: ['Mowbray', 'Claremont', 'Newlands'],
      times: ['16:00', '22:00'],
      numReviews: 15,
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 0,
      type: 'Premium',
    },
    {
      name: 'Coast Starlight',
      slug: 'Coast-Starlight',
      imgUrl: '/images/coast_starlight.jpg',
      price: 765,
      stations: ['Bellville', 'Pinelands', 'Rosebank'],
      times: ['00:00', '04:00'],
      numReviews: 7,
      rating: 5.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 762,
      type: 'Premium',
    },
    {
      name: 'Continental',
      slug: 'Continental',
      imgUrl: '/images/continental.jpg',
      price: 325,
      stations: ['Newlands', 'Mowbray', 'Crawford'],
      times: ['10:00', '14:00'],
      numReviews: 15,
      rating: 3.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 325,
      type: 'Budget',
    },
    {
      name: 'Da Train',
      slug: 'data-train',
      imgUrl: '/images/da_train.jpg',
      price: 390,
      stations: ['Bellville', 'Rosebank', 'Pinelands'],
      times: ['11:00', '15:00'],
      numReviews: 17,
      rating: 5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 680,
      type: 'Budget',
    },
    {
      name: 'Daylight Connection',
      slug: 'Daylight-Connection',
      imgUrl: '/images/daylight_connection.jpg',
      price: 540,
      stations: ['Bellville', 'Rosebank', 'Crawford'],
      times: ['13:00', '17:00'],
      numReviews: 15,
      rating: 4.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 680,
      type: 'Premium',
    },
    {
      name: 'Hugs Rail',
      slug: 'Hugs-Rail',
      imgUrl: '/images/hugs_rail.jpg',
      price: 260,
      stations: ['Pinelands', 'Newlands', 'Mowbray'],
      times: ['17:00', '19:00'],
      numReviews: 17,
      rating: 2.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 542,
      type: 'Budget',
    },
    {
      name: 'Northern',
      slug: 'Northern',
      imgUrl: '/images/northern.jpg',
      price: 820,
      stations: ['Mowbray', 'Newlands', 'Rosebank'],
      times: ['21:00', '23:00'],
      numReviews: 23,
      rating: 5.5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 760,
      type: 'Premium',
    },
    {
      name: 'Northland Special',
      slug: 'Northland-Special',
      imgUrl: '/images/northland_special.jpg',
      price: 415,
      stations: ['Bellville', 'Mowbray', 'Pinelands'],
      times: ['08:00', '09:00'],
      numReviews: 17,
      rating: 5.3,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 550,
      type: 'Budget',
    },
    {
      name: 'Orange Star',
      slug: 'Orange-Star',
      imgUrl: '/images/orange_star.jpg',
      price: 620,
      stations: ['Bellville', 'Claremont', 'Newlands'],
      times: ['06:00', '07:00'],
      numReviews: 18,
      rating: 8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 56,
      type: 'Premium',
    },
    {
      name: 'Red Engine',
      slug: 'Red-Engine',
      imgUrl: '/images/red_engine.jpg',
      price: 360,
      stations: ['Bellville', 'Claremont', 'Crawford'],
      times: ['04:00', '07:00'],
      numReviews: 16,
      rating: 5.2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 350,
      type: 'Budget',
    },
    {
      name: 'Traders Overland',
      slug: 'Traders-Overland',
      imgUrl: '/images/traders_overland.jpg',
      price: 290,
      stations: ['Mowbray', 'Claremont', 'Newlands'],
      times: ['05:00', '12:00', '11:00'],
      numReviews: 23,
      rating: 5.6,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tickets: 10,
      type: 'Budget',
    },
  ],
  stations: [
    'Bellville',
    'Mowbray',
    'Claremont',
    'Newlands',
    'Pinelands',
    'Crawford',
    'Rosebank',
  ],
};

export default data;
