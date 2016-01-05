package com.caprusit.ems.dao;

import java.util.List;

import com.caprusit.ems.domain.Employee;

public interface IManageUserDAO {
	
	public List<Employee> getEmployees();

	/* public List<Employee> getEmployees() ; */
	public Employee findById(int id);

	/*public void updateUser(Employee user);*/

	int saveEmployee(Employee employee);

	public int updateEmployee(Employee emp);

}
