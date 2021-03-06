const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {

  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(result => {
      if (result.rows) {
        return result.rows[0];
      } return null;
    });

};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool
    .query(`SELECT * 
          FROM users 
          WHERE id = $1;`, [id])
    .then(result => {
      if (result.rows) {
        return result.rows[0];
      } return null;
    });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const userInput = [...Object.values(user)];
  const addUserQuery = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) RETURNING *;
    `;
  return pool
    .query(addUserQuery, userInput)
    .then(results => {
      if (results.rows) {
        return results.rows;
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool
    .query(`
    SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
    FROM reservations 
    JOIN properties ON properties.id = property_id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1 
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`, [guest_id, limit])

    .then(result => {
      if (result.rows) {
        return result.rows;
      } return null;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties


const getAllProperties = function(options, limit) {

  const queryParams = [];

  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON properties.id = property_id
      `;
    
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night) * 100);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(parseInt(options.maximum_price_per_night) * 100);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} cost_per_night < $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `${queryParams.length === 1 ? 'WHERE' : 'AND'} property_reviews.rating > $${queryParams.length}`;
  }
    
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
    
  return pool.query(queryString, queryParams).then((res) => res.rows);

};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const addPropertyQuery = `
    INSERT INTO properties (owner_id, title, description, cover_photo_url, thumbnail_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bedrooms, number_of_bathrooms) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
    `;
  const userInput = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bedrooms,
    property.number_of_bathrooms
  ];
  return pool
    .query(addPropertyQuery, userInput)
    .then(results => {
      if (results.rows) {
        return results.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addProperty = addProperty;
