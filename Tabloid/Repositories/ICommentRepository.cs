using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        List<Comment> GetAllCommentsByPostId(int id);
        Comment GetById(int id);
    }
}