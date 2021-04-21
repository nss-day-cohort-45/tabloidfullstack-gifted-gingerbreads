using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        List<Tag> GetAll();
        void Update(Tag tag);
        void Delete(int id);
        Tag GetTagById(int id);
    }
}