UPDATE UserProfile
SET FirebaseUserId = 'lwu4hYYUN0gwjq9pWbI7wwWjfFo2'
WHERE Id = 1

UPDATE UserProfile 
SET FirebaseUserId = 'sQe7hijtzkN75PMj38FPweyPncm1'
WHERE Id = 2

USE [Tabloid]
set IDENTITY_INSERT [UserProfile] on
ALTER TABLE UserProfile
ADD Deactivated DateTime
set identity_insert [UserProfile] off

SELECT * from UserProfile

UPDATE UserProfile 
SET Deactivated = '2021-04-20 14:47:00.000'
WHERE Id = 1

SELECT * from UserProfile
WHERE Id = 1