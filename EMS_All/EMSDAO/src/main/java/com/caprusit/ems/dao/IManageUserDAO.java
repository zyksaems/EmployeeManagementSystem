package com.caprusit.ems.dao;

import java.util.List;

import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeForDate;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.Notice;
import com.caprusit.ems.domain.ProfileImage;
import com.caprusit.ems.domain.SetProfileImage;

public interface IManageUserDAO {

  public List<Employee> getEmployees();

  /* public List<Employee> getEmployees() ; */
  public Employee findById(int id);

  /* public void updateUser(Employee user); */

  int saveEmployee(Employee employee);

  public int updateEmployee(Employee emp);

  public List<EmployeeForDate> getAllEmployeesData();

  public Integer updateEmployeeData(Employee e);

  int saveEncryptedEmployee(EncryptedEmployee encEmp);

  public List<Notice> getNotice();

  public void deleteNotice(Notice notice);

  public void setNotice(Notice notice);

  public void setPic(ProfileImage profileImage, SetProfileImage setProfileImage);

  public SetProfileImage getPic(int employeeId);

}
