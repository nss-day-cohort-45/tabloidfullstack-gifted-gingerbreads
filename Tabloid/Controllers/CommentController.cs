using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
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
            comment.CreateDateTime = DateTime.Now.ToString("MM/dd/yyyy");
            _commentRepository.Add(comment);
            return CreatedAtAction("Details", new { commentId = comment.Id }, comment);
        }





        [HttpPut("/comment/edit/{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }





        [HttpDelete("/comment/delete/{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
