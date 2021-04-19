using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
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

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_postTagRepo.GetAllTagsForPost());
        }
    }
}
