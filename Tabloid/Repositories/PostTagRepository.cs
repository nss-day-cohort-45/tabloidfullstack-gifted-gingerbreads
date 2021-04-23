using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration config) : base(config) { }

        public List<PostTag> GetAllPostTagsForPost(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT  pt.Id AS PostTagId, pt.PostId, pt.TagId, 
                            p.Title AS PostTitle, p.Id AS PostId, p.Content, p.ImageLocation, p.PublishDateTime, p.CategoryId, 
                            t.Name AS TagName, t.Id AS TagId 

                    FROM    PostTag pt

               LEFT JOIN    Post p ON pt.PostId = p.Id 
               LEFT JOIN    Tag t ON pt.TagId = t.Id

                    WHERE   pt.PostId = @PostId
                    ";

                    DbUtils.AddParameter(cmd, "@PostId", id);

                    var reader = cmd.ExecuteReader();

                    var postTags = new List<PostTag>();
                    while (reader.Read())
                    {
                        postTags.Add(new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "PostTagId"),

                            PostId = id,
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "PostTitle"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime").ToString("MM/dd/yyyy"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),        
                            },

                            TagId = DbUtils.GetInt(reader, "TagId"),
                            Tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            }
                        });
                    }

                    reader.Close();
                    return postTags;
                }

            }
        }

        //public List<PostTag> GetAll()
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT Id, PostId, TagId
        //                LEFT JOIN Category c ON c.Id = p.CategoryId
        //                LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
        //                FROM PostTag
        //            ";

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                var postTags = new List<PostTag>();
        //                while (reader.Read())
        //                {
        //                    postTags.Add(new Tag()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        PostId = DbUtils.GetInt(reader, "PostId"), 
        //                        Post = new Category()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "CategoryId"),
        //                            Name = DbUtils.GetString(reader, "Name")
        //                        },

        //                        TagId = DbUtils.GetInt(reader, "TagId"),

        //                    });
        //                }

        //                reader.Close();
        //                return postTags;
        //            }
        //        }
        //    }
        //}


        public PostTag GetPostTagById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id
                            FROM PostTag
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        PostTag postTag = new PostTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id"))
                        };
                        reader.Close();
                        return postTag;
                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public void Add(PostTag postTag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag(PostId, TagId)
                        OUTPUT INSERTED.ID
                        VALUES (@postId, @tagId)";

                    cmd.Parameters.AddWithValue("@postId", postTag.PostId);
                    cmd.Parameters.AddWithValue("@tagId", postTag.TagId);

                    int id = (int)cmd.ExecuteScalar();

                    //postTag.Id = id;
                }
            }
        }

        public void Delete(int postTagId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM PostTag
                        WHERE Id = @postTagId";

                    cmd.Parameters.AddWithValue("@postTagId", postTagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
