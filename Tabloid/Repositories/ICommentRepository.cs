using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllCommentsByPostId(int id);
        Comment GetById(int id);
        void Add(Comment comment);
        void Update(Comment comment);
    }
}