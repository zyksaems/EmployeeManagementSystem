package com.caprusit.ems.service;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.service.IManageUserService;
import com.google.gson.Gson;

@Service
public class ManageUserServiceImpl implements IManageUserService{

	@Autowired
	private IManageUserDAO manageUserDAO;
	private List<Employee> users;
	
	private  Logger logger = Logger.getLogger(ManageUserServiceImpl.class);
	
	
	
public String getEmployees() {
		
		logger.info("inside ManageUserServiceImpl getEmployees()");
		List<Employee> employeeList = manageUserDAO.getEmployees();
		return convertToJson(employeeList);
	}

public static String convertToJson(Object obj) {
		
		Gson gson = new Gson();
		return gson.toJson(obj);

	}

public List<Employee> getAllEmployee() {
	List<Employee> employeeList = manageUserDAO.getEmployees();
	return employeeList;
}


public List<Employee> findAllUsers() {

	System.out.println("Inside Userservice findAllUsers()");
	List<Employee> allEmpData = manageUserDAO.getEmployees();
	users=allEmpData;
	System.out.println(allEmpData.toString());
	return allEmpData;
}


public Employee findById(int id) {
	for(Employee user : users){
		if(user.getEmployeeId() == id){
			System.out.println("In UserService fingById()");
			Employee oneUser=manageUserDAO.findById(id);
			System.out.println("oneUser="+oneUser);
			return oneUser;
		}
	}
	return null;
}

public void updateUser(Employee user) {
	System.out.println("In updatUser() all users="+users);
	System.out.println("provided user="+user);
	int index = users.indexOf(user);
	System.out.println("index of user= "+index );
	//users.set(index, user);
	
	manageUserDAO.updateUser(user);		
}

}
