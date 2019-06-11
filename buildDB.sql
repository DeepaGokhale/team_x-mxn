Drop Database TeamXmXn;

Create Database TeamXmXn;

use TeamXmXn;

CREATE TABLE `Users`
(
  `user_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255),
  `password` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `Jobs`
(
  `job_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `company` varchar(255),
  `title` varchar(255),
  `description` varchar(255),
  `close_by` datetime,
  `active` boolean,
  `created_on` datetime COMMENT 'When job gets created'
);

CREATE TABLE `ActionType`
(
  `action_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `action_type` varchar(255)
);

CREATE TABLE `Actions`
(
  `job_action_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `action_id` int NOT NULL,
  `action_date` datetime,
  `comments` varchar(255)
);

ALTER TABLE `Jobs` ADD FOREIGN KEY (`userid`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Actions` ADD FOREIGN KEY (`action_id`) REFERENCES `ActionType` (`action_id`);

ALTER TABLE `Actions` ADD FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`job_id`);


insert into users 
(user_name, password)
values('deepa', 'test')