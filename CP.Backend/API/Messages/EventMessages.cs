using System;
using System.Collections.Generic;

namespace API.Messages
{
    public class Create
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool AllDay { get; set; }
        public IEnumerable<string> UserIds { get; set; }
    }

    public class Update
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool AllDay { get; set; }
        public IEnumerable<string> UserIds { get; set; }
    }

    public class Remove
    {
        public string Id { get; set; }
    }
}