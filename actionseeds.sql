USE teamxmxn;

INSERT INTO Users
(user_name, password, created_at, createdAt, updatedAt)
VALUES('test1', 'test', now(), now(), now());
INSERT INTO Users
(user_name, password, created_at, createdAt, updatedAt)
VALUES('test2', 'test', now(), now(), now());

INSERT INTO jobs
(company, title, description, close_by, active, created_on, createdAt, updatedAt, UserId)
VALUES("Company 1", "Title 1", "Description 1", now(), true, now(), now(), now(), 1);
INSERT INTO jobs
(company, title, description, close_by, active, created_on, createdAt, updatedAt, UserId)
VALUES("Company 2", "Title 2", "Description 2", now(), true, now(), now(), now(), 1);
INSERT INTO jobs
(company, title, description, close_by, active, created_on, createdAt, updatedAt, UserId)
VALUES("Company 3", "Title 3", "Description 3", now(), true, now(), now(), now(), 2);

INSERT INTO actions
(action_type, action_date, comments, createdAt, updatedAt, JobJobId)
VALUES("Email", now(), "Comment 1", now(), now(), 1);
INSERT INTO actions
(action_type, action_date, comments, createdAt, updatedAt, JobJobId)
VALUES("Phone", now(), "Comment 2", now(), now(), 1);
INSERT INTO actions
(action_type, action_date, comments, createdAt, updatedAt, JobJobId)
VALUES("Email", now(), "Comment 3", now(), now(), 2);
