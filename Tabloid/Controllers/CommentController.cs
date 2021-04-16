﻿using Microsoft.AspNetCore.Mvc;
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





        // https://localhost:5001/api/comment/  //might need to change this
        [HttpGet]
        public IActionResult Get(int PostId)
        {
            return Ok(_commentRepository.GetAllCommentsByPostId(PostId));
        }





        // https://localhost:5001/api/comment/
        [HttpPost]
        public IActionResult Comment(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }





        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }
    }
}
