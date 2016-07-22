package com.caprusit.ems.service;

import java.io.InputStream;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.JsonEmployee;
import com.caprusit.ems.domain.Notice;
import com.caprusit.ems.domain.ProfileImage;
import com.caprusit.ems.domain.SetProfileImage;

@Service("UserService")
@Transactional
public interface IManageUserService {

  public String getEmployees();

  public List<Employee> getAllEmployee();

  Employee findById(int id);

  void updateUser(Employee employee);

  List<Employee> findAllUsers();

  public String uploadEmployeeDetailsExcelFile(InputStream excelInputStream, String fileName);

  public int addSingleEmployee(Employee emp, String milliseconds);

  public int updateEmployee(Employee employee);

  public List<JsonEmployee> getAllEmployeesData();

  public String updateEmployeeData(Employee e);

  public List<Notice> getNotice();

  public void deleteNotice(Notice notice);

  public void setNotice(Notice notice);

  public void setPic(ProfileImage profileImage, SetProfileImage setProfileImage);

  public SetProfileImage getPic(int employeeId);

}
