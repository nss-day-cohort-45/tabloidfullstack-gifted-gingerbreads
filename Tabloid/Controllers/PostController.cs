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

        [HttpGet("GetByUser")]
        public IActionResult GetByUser(int userId)
        {
            var userPosts = _postRepository.GetUserPosts(userId);
            if (userPosts == null)
            {
                return NotFound();
            }
            return Ok(userPosts);
        }

        [HttpGet("GetByCategory")]
        public IActionResult GetByCategory(int categoryId)
        {
            var userPosts = _postRepository.GetPostsByCategory(categoryId);
            if (userPosts == null)
            {
                return NotFound();
            }
            return Ok(userPosts);
        }



        [HttpGet("GetById")]
        public IActionResult GetById(int postId)
        {
            var post = _postRepository.GetPostById(postId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    }
}
