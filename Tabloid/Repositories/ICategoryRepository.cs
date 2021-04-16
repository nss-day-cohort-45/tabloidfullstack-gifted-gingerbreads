using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetCategoryById(int id);

        void Delete(int id);
        void Add(Category category);
        void Update(Category category);
    }
}