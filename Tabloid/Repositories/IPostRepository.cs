using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();

        List<Post> GetUserPosts(int userProfileId);

        Post GetPostById(int PostId);
        List<Post> GetPostsByCategory(int CategoryId);

        void Add(Post post);

        void Delete(int postId);

        void Update(Post post);
    }
}