package com.caprusit.ems.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.caprusit.ems.domain.Employee;



@Service("UserService")
@Transactional
public interface IManageUserService {

	
	public String getEmployees();

	public List<Employee> getAllEmployee();
	

	Employee findById(int id);
	
	void updateUser(Employee employee);


	List<Employee> findAllUsers();

	
}
