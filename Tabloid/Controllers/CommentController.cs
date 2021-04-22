using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;



namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }





        [HttpGet("/comments/{postId}")]
        public IActionResult Get(int PostId)
        {
            return Ok(_commentRepository.GetAllCommentsByPostId(PostId));
        }





        [HttpGet("/comment/{commentId}")]
        public ActionResult Details(int commentId)
        {
            var comment = _commentRepository.GetCommentById(commentId);
            if (comment == null)
                { 
                    return NotFound();
                }
            return Ok(comment);
        }





        [HttpPost("/comment/{postId}/create")]
        public IActionResult Comment(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            comment.UserProfileId = currentUserProfile.Id;
            comment.CreateDateTime = DateTime.Now.ToString("MM/dd/yyyy");
            _commentRepository.Add(comment);
            return CreatedAtAction("Details", new { commentId = comment.Id }, comment);
        }





        [HttpPut("/comment/{commentId}/edit")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            var currentUserProfile = GetCurrentUserProfile();
            comment.UserProfileId = currentUserProfile.Id;
            _commentRepository.Update(comment);
            return NoContent();
        }





        [HttpDelete("/comment/delete/{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }





        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
