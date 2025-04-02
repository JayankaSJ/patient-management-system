using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PatientsApi.Dtos {
    public class UpdatePatientRequestDto {

        [JsonProperty("id")]
        [Required]
        public int Id { get; set; }

        [JsonProperty("firstname")]
        [Required]
        public string FirstName { get; set; }

        [JsonProperty("lastname")]
        [Required]
        public string LastName { get; set; }

        [JsonProperty("email")]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [JsonProperty("phone")]
        [Required]
        public string PhoneNumber { get; set; }

        [JsonProperty("dateOfBirth")]
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
