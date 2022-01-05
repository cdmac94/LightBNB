INSERT INTO users (name, email, password)
VALUES ('Jon Bon Jovi', 'u_give_love@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Mariah Carey', 'always_b_my_baby@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jimmy Page', 'starway2heaven@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Conway Twitty', 'helloDarlin1@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, cost_night, parking_spaces, bathrooms, bedrooms, thumbnail, coverphoto, country, street, city, province, post_code)
VALUES (1, 'Jersey Beach House', 'description', 150, 2, 3, 3, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'U.S.A.', '1 Beachway.blvd', 'Jersey Shore', 'New Jersey', '90059'),
(2, 'Mansion', 'description', 300, 4, 6, 8, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'U.S.A.', 'Is it so hard to believe.private', 'Sacremento', 'California', '45645'),
(4, 'Twitty City', 'description', 1250, 12, 10, 15, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'U.S.A.', 'Unamed rd.', 'Hendersonville', 'Tennesse', '37217');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (3, 2, '2019-02-13', '2019-02-17'),
(1, 2, '2019-03-20', '2019-03-29'),
(1, 3, '2019-06-04', '2019-06-18'),
(2, 2, '2019-07-17', '2019-07-27'),
(4, 1, '2019-08-12', '2019-08-19'),
(3, 1, '2019-09-06', '2019-09-24'),
(2, 3, '2019-10-10', '2019-10-17'),
(2, 1, '2019-11-28', '2019-12-02'),
(4, 2, '2020-02-12', '2020-02-13');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, message, rating)
VALUES (3, 2, 1, 'message', 4),
(4, 2, 9, 'message', 3),
(2, 1, 8, 'message', 5),
(1, 2, 2, 'message', 2),
(3, 1, 6, 'message', 4);
