using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PatientsApi.Dtos {
    public class CreatePatientRequestDto {

        [JsonProperty("FirstName")]
        [Required]
        public string FirstName { get; set; }

        [JsonProperty("LastName")]
        [Required]
        public string LastName { get; set; }

        [JsonProperty("email")]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [JsonProperty("PhoneNumber")]
        [Required]
        public string PhoneNumber { get; set; }

        [JsonProperty("dateOfBirth")]
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
