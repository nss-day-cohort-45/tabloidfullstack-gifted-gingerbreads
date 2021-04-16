using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;
        
        public TagController(ITagRepository tagRepo)
        {
            _tagRepo = tagRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepo.GetAll());
        }

        [HttpPost("add")]
        public IActionResult Add(Tag tag)
        {
            _tagRepo.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Update(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepo.Update(tag);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepo.Delete(id);
            return NoContent();
        }


    }
}
