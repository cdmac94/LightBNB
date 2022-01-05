DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE properties(
  id SERIAL PRIMARY KEY  NOT NULL,
  owner_id INTEGER REFERENCES users.id ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cost_night INTEGER,
  parking_spaces INTEGER,
  bathrooms INTEGER,
  bedrooms INTEGER,
  thumbnail TEXT,
  coverphoto TEXT,
  country VARCHAR(50),
  street VARCHAR(75),
  city  VARCHAR(50),
  province VARCHAR(50),
  post_code VARCHAR(50),
  status BOOLEAN
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  reservation_id INTEGER REFERENCES reservations.id ON DELETE CASCADE,
  message TEXT,
  rating SMALLINT CHECK (rating <= 5)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users.id ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties.id ON DELETE CASCADE,
  start_date DATE,
  end_date DATE
);