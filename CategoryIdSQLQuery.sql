 SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.CategoryId,
                        c.Id AS CategoryId, c.[Name],
                        up.Id AS UserProfileId, up.DisplayName
                        FROM Post p
                        LEFT JOIN Category c ON c.Id = p.CategoryId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE p.CategoryId = 1