using Backend.Models;

namespace Backend.Data.Repository
{
    public interface IAdminRepository
    {
        Admin Create(Admin admin);
        Admin GetByUsername(string username);
        Admin GetById(int id);
    }
}
