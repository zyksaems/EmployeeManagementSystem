package com.caprusit.ems.service;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.service.IManageUserService;
import com.google.gson.Gson;

@Service
public class ManageUserServiceImpl implements IManageUserService{

	@Autowired
	private IManageUserDAO manageUserDAO;
	
	private  Logger logger = Logger.getLogger(ManageUserServiceImpl.class);
	
	
	
public String getEmployees() {
		
		logger.info("inside ManageUserServiceImpl getEmployees()");
		List<Object> employeeList = manageUserDAO.getEmployees();
		return convertToJson(employeeList);
	}

public static String convertToJson(Object obj) {
		
		Gson gson = new Gson();
		return gson.toJson(obj);

	}

}
