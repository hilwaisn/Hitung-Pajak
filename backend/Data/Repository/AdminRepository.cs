using Backend.Models;
using EmployeeRegisterAPI.Data;

namespace Backend.Data.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly EmployeeDbContext _context;
        public AdminRepository(EmployeeDbContext context)
        {
            _context = context;
        }
        Admin IAdminRepository.Create(Admin admin)
        {
            _context.Admins.Add(admin);
            admin.id =  _context.SaveChanges();

            return admin;
        }

        Admin IAdminRepository.GetByUsername(string username)
        {
            return _context.Admins.FirstOrDefault(u => u.username == username);
        }

        Admin IAdminRepository.GetById(int id)
        {
            return _context.Admins.FirstOrDefault(u => u.id == id);
        }
    }
}
