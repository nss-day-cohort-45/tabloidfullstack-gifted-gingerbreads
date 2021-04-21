using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        void Delete(int postTagId);
        List<PostTag> GetAllPostTagsForPost(int id);
    }
}