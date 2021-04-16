using System;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var userPosts = _postRepository.GetUserPosts(userId);
            if (userPosts == null)
            {
                return NotFound();
            }
            return Ok(userPosts);
        }
    }
}
