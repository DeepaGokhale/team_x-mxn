DROP DATABASE IF EXISTS teamxmxn;
CREATE DATABASE teamxmxn;

USE teamxmxn;

CREATE TABLE `Users`
(
  `user_id` int PRIMARY KEY,
  `user_name` varchar(255),
  `password` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `Jobs`
(
  `job_id` int PRIMARY KEY,
  `user_id` int NOT NULL,
  `company` varchar(255),
  `title` varchar(255),
  `description` varchar(255),
  `close_by` datetime,
  `active` boolean,
  `created_at` datetime COMMENT 'When job gets created'
);

CREATE TABLE `Action_Type`
(
  `action_id` int PRIMARY KEY,
  `action_type` varchar(255)
);

CREATE TABLE `Actions`
(
  `job_action_id` int PRIMARY KEY,
  `job_id` int NOT NULL,
  `action_id` int NOT NULL,
  `action_date` datetime,
  `comments` varchar(255)
);

ALTER TABLE `Jobs` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `Actions` ADD FOREIGN KEY (`action_id`) REFERENCES `Action_Type` (`action_id`);

ALTER TABLE `Actions` ADD FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`job_id`)
