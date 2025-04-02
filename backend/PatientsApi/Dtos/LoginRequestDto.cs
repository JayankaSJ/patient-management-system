using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PatientsApi.Dtos {
    public class LoginRequestDto {
        [JsonProperty("username")]
        [Required]
        public string Username { get; set; }

        [JsonProperty("password")]
        [Required]
        public string Password { get; set; }
    }
}
