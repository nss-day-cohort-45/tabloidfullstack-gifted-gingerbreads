using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string ImageLocation { get; set; }

        public string CreateDateTime { get; set; }

        public string PublishDateTime { get; set; }

        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }

        public Category PostCategory { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile PostAuthor { get; set; }
    }
}
