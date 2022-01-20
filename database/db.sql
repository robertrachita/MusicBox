CREATE DATABASE IF NOT EXISTS `MUSICDATE` DEFAULT CHARACTER SET utf8mb4;
USE `MUSICDATE`;

CREATE TABLE IF NOT EXISTS `users`
(
    `user_id`       INT                 NOT NULL AUTO_INCREMENT,
    `email`         VARCHAR(255) UNIQUE NOT NULL,
    `first_name`    VARCHAR(50)         NOT NULL,
    `last_name`     VARCHAR(50)         NOT NULL,
    `date_of_birth` DATE                NOT NULL,
    `city`          VARCHAR(30)         NOT NULL,
    `country`       VARCHAR(30)         NOT NULL,
    `instrument`    VARCHAR(30)         NOT NULL,
    `password`      VARCHAR(255)        NOT NULL,

    CONSTRAINT PK_user_id PRIMARY KEY (user_id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1001
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `music_sheets`
(
    `music_sheet_id` INT          NOT NULL AUTO_INCREMENT,
    `user_id`        INT          NULL,
    `file_path`      VARCHAR(255) NOT NULL,

    CONSTRAINT PK_music_sheet_id PRIMARY KEY (music_sheet_id),
    CONSTRAINT FK_musicpath_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE = InnoDB
  AUTO_INCREMENT = 1001
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `rooms`
(
    `room_id`       VARCHAR(255) NOT NULL,,

    CONSTRAINT PK_user_id PRIMARY KEY (room_id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1001
  DEFAULT CHARSET = utf8mb4;
