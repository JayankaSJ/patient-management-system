using AutoMapper;
using PatientsApi.Dtos;
using PatientsApi.Models;

namespace PatientsApi {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<CreatePatientRequestDto, Patient>();
            CreateMap<UpdatePatientRequestDto, Patient>();
        }
    }
}
