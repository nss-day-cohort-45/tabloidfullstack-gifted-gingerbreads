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
        private readonly IUserProfileRepository _userProfileRepository;

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

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            post.UserProfileId = currentUserProfile.Id;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("/delete/{postId}")]
        public IActionResult Delete(int postId)
        {
            _postRepository.Delete(postId);
            return NoContent();
        }

        [HttpPut("{postId}")]
        public IActionResult Put(int PostId, Post post)
        {
            if (PostId != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
