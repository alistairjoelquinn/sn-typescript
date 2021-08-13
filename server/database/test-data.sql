DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   recipient_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
);

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (12, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (22, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (32, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (42, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (52, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (72, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (82, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (92, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (134, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (135, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (136, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (137, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (187, 3, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (120, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (121, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (122, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (123, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (124, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (125, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (129, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (126, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (141, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (142, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (143, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (144, 3, false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (145, 3, false);