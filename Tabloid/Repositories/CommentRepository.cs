using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Tabloid.Utils;
using Tabloid.Models;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }





        public List<Comment> GetAllCommentsByPostId(int id) //find which model this lives in
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                                 up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                            FROM Comment c
                          LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                          WHERE c.PostId = @Id
                          ORDER BY CreateDateTime";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = id,
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                            }
                        });
                    }

                    reader.Close();

                    return comments;
                }
            }
        }




            public Comment GetById(int id)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                          SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                                 up.Id AS UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email
                            FROM Comment c
                          LEFT JOIN UserProfile up ON c.UserProfileId = up.Id
                          ORDER BY CreateDateTime";

                        DbUtils.AddParameter(cmd, "@c.Id", id);

                        var reader = cmd.ExecuteReader();

                        Comment comment = null;
                        if (reader.Read())
                        {
                            comment = new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "Content"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                }
                            };
                        }

                        reader.Close();

                        return comment;
                    }
                }
            }





        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment(PostId, UserProfileId, Subject, Content, CreateDateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime)";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProofileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }





        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                           SET PostId = @PostId,
                               UserProfileId = @UserProfileId,
                               Subject = @Subject,
                               Content = @Content,
                               CreateDateTime = @CreateDateTime
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }





        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}