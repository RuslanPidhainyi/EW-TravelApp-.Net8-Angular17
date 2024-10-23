using System;

namespace API.DTOs;

public class MemberUpdatedDto
{
    public string? Description { get; set; }
    public string? Interests { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
}