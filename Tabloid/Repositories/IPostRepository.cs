using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();

        List<Post> GetUserPosts(int userProfileId);

        List<Post> GetPostById(int PostId);
        List<Post> GetPostsByCategory(int CategoryId);
    }
}