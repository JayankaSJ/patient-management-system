namespace PatientsApi.Models {
    public class JwtTokenResponse {
        public string Token { get; set; }
        public DateTime Expiry { get; set; }
    }
}
