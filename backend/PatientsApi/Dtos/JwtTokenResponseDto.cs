using Newtonsoft.Json;

namespace PatientsApi.Dtos {
    public class JwtTokenResponseDto {
        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("expiry")]
        public DateTime Expiry { get; set; }
    }
}
