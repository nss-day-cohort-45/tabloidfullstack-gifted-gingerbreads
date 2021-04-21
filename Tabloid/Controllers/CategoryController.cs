using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cat = _categoryRepository.GetCategoryById(id);
            if (cat == null)
            {
                return NotFound();
            }
            return Ok(cat);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Category cat)
        {
            _categoryRepository.Add(cat);
            return CreatedAtAction("Get", new { id = cat.Id }, cat);

        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Category cat)
        {
            if (id != cat.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(cat);
            return NoContent();
        }


    }
}