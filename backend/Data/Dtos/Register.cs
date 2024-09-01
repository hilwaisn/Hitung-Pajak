using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Dtos
{
    public class Register
    {
        [Required(ErrorMessage = "Username is required")]
        public string username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 20 characters")]
        public string password { get; set; }
        public bool IsAdmin { get; set; }
    }
}
