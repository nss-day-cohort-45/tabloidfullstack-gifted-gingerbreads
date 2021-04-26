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

        //public void UpdatePostTag(PostTag postTag)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                UPDATE PostTag
        //                set
        //                    PostId = @postId,
        //                    TagId = @tagId
        //                WHERE Id = @id";

        //            cmd.Parameters.AddWithValue("@postId", postTag.PostId);
        //            cmd.Parameters.AddWithValue("@tagId", postTag.TagId);
        //            cmd.Parameters.AddWithValue("@id", postTag.Id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}


        // Get all tags for post

        // Add tag to post

        // Edit tags for post

    }
}
