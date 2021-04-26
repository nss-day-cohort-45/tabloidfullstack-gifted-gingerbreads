using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : Controller
    {
        private readonly IPostTagRepository _postTagRepo;
        private readonly IPostRepository _postRepo;

        public PostTagController(IPostTagRepository postTagRepo, IPostRepository postRepo)
        {
            _postTagRepo = postTagRepo;
            _postRepo = postRepo;
        }

        [HttpGet("Manage-Tags/{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_postTagRepo.GetAllPostTagsForPost(id));
        }

        [HttpPost("Add")]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepo.Add(postTag);
            return CreatedAtAction("Details", new { id = postTag.Id }, postTag);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepo.Delete(id);
            return NoContent();
        }

        [HttpGet("GetById/{postTagId}")]
        public IActionResult GetById(int postTagId)
        {
            var postTag = _postTagRepo.GetPostTagById(postTagId);
            if (postTag == null)
            {
                return NotFound();
            }
            return Ok(postTag);
        }


    }
}
