using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PatientsApi.Attributes;
using PatientsApi.Dtos;
using PatientsApi.Models;
using PatientsApi.Services;

namespace PatientsApi.Controllers {
    [Route("api/patients")]
    [ApiController]
    public class PatientsController : ControllerBase {
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public PatientsController(IMapper mapper, IPatientService patientService) {
            _patientService = patientService;
            _mapper = mapper;
        }

        [HttpGet]
        [Permissions("patient:read")]
        public async Task<IActionResult> GetPatientsAsync() {
            var patients = await _patientService.GetAllPatientsAsync();
            return Ok(patients);
        }

        [HttpPost]
        [Permissions("patient:create")]
        public async Task<IActionResult> CreatePatientAsync([FromBody] CreatePatientRequestDto patient) {
            var mappedModel = _mapper.Map<Patient>(patient);
            if (mappedModel != null) {
                await _patientService.AddPatientAsync(mappedModel);
            }
            return Ok(mappedModel);
        }

        [HttpPut("{id}")]
        [Permissions("patient:update")]
        public async Task<IActionResult> UpdatePatientAsync(int id, [FromBody] UpdatePatientRequestDto patient) {
            var mappedModel = _mapper.Map<Patient>(patient);
            if (mappedModel != null) {
                mappedModel.Id = id;
                await _patientService.UpdatePatientAsync(mappedModel);
            }
            return Ok(mappedModel);
        }

        [HttpDelete("{id}")]
        [Permissions("patient:delete")]
        public async Task<IActionResult> DeletePatientAsync(int id) {
            await _patientService.DeletePatientAsync(id);
            return Ok();
        }
    }

}
