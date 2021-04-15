using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetCategoryById(int id);
    }
}