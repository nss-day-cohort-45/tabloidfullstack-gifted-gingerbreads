using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PostId, p.Title, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                        c.Id AS CategoryId, c.[Name],
                        up.Id AS UserProfileId, up.FirstName, up.LastName
                        FROM Post p
                        LEFT JOIN Category c ON c.Id = p.CategoryId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE p.IsApproved = 1
                        ORDER BY p.CreateDateTime";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime").ToString("MM/dd/yyyy"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime").ToString("MM/dd/yyyy"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            PostCategory = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostAuthor = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public List<Post> GetUserPosts(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PostId, p.Title, p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                        c.Id AS CategoryId, c.[Name],
                        up.Id AS UserProfileId, up.FirstName, up.LastName
                        FROM Post p
                        LEFT JOIN Category c ON c.Id = p.CategoryId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE up.id = @userProfileId
                        ORDER BY p.CreateDateTime";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime").ToString("MM/dd/yyyy"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime").ToString("MM/dd/yyyy"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            PostCategory = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostAuthor = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        public List<Post> GetPostsByCategory(int CategoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.CategoryId
                        c.Id AS CategoryId, c.[Name],
                        up.Id AS UserProfileId, up.DisplayName
                        FROM Post p
                        LEFT JOIN Category c ON c.Id = p.CategoryId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE p.CategoryId = @id";


                    cmd.Parameters.AddWithValue("@id", CategoryId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime").ToString("MM/dd/yyyy"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            PostCategory = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostAuthor = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }

                        });

                    }
                    reader.Close();
                    return posts;
                }
            }
        }
        public List<Post> GetPostById(int PostId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PostId, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
                        c.Id AS CategoryId, c.[Name],
                        up.Id AS UserProfileId, up.DisplayName
                        FROM Post p
                        LEFT JOIN Category c ON c.Id = p.CategoryId
                        LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                        WHERE p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", PostId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime").ToString("MM/dd/yyyy"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            PostCategory = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostAuthor = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
    }
}
