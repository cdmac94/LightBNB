const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

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
      return result.rows[0]
    } return null
  })

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
      return result.rows[0]
    } return null
  })
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
}
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
  .then (result => {
    if (result.rows) {
      return result.rows
    } return null
  })
};
exports.getAllReservations = getAllReservations;

/// Properties


const getAllProperties = function(options, limit) {

  return pool
    .query(`SELECT * 
    FROM properties
    LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
