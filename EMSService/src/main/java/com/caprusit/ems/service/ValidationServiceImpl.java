package com.caprusit.ems.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.dao.ValidationDAO;
import com.caprusit.ems.domain.EmployeeData;
import com.caprusit.ems.utility.EmailUtility;
import com.caprusit.ems.utility.JsonUtility;

@Service
public class ValidationServiceImpl implements ValidationService {
	
	@Autowired
	private ValidationDAO validationDAO;

	private  Logger logger = Logger.getLogger(ValidationServiceImpl.class);

	@Transactional(readOnly=true)
	public String getAllEmployeeIds() {

		logger.info("inside ValidationServiceImpl getAllEmployeeIds()");
		List<Object> allEmpData = validationDAO.getAllEmploeeIds();

		List<EmployeeData> listOfAllEmpIds = new ArrayList<EmployeeData>();

		for (Object data : allEmpData) {

			Object[] array = (Object[]) data;
			EmployeeData emp = new EmployeeData();
			emp.setEmpId((Integer) array[0]);
			emp.setEmpName((String) array[1] + " " + (String) array[2]);
			listOfAllEmpIds.add(emp);

		}
	
		return JsonUtility.convertToJson(listOfAllEmpIds);

	}

	@Transactional(readOnly=true)
	public String getLoggedInEmoloyeeIds() {

		logger.info("inside ValidationServiceImpl getLoggedInEmoloyeeIds()");

		List<Object> loggedInList = validationDAO.getLoggedInEmployeeIds();
		logger.info("list size loggedinemp" + loggedInList.size());

		return JsonUtility.convertToJson(loggedInList);
	}

	@Transactional(readOnly=true)
	public String getLoggedOutEmployeeIds() {

		logger.info("inside ValidationServiceImpl getLoggedOutEmployeeIds()");

		List<Object> loggedOutList = validationDAO.getLoggedOutEmoloyeeIds();
		logger.info("list size logged out emp" + loggedOutList.size());

		return JsonUtility.convertToJson(loggedOutList);
		
	}

	@Transactional(readOnly=true)
	public String getRoleIds() {
		
		logger.info("inside ValidationServiceImpl getRoleIds()");

		List<Object> roleIdsList = validationDAO.getRoleIds();
		logger.info("list size  of role Ids list" + roleIdsList.size());

		return JsonUtility.convertToJson(roleIdsList);
	}

	@Transactional(readOnly=true)
	public String getDeptIds() {
		logger.info("inside ValidationServiceImpl getDeptIds()");

		List<Object> deptIdsList = validationDAO.getDeptIds();
		logger.info("list size of dept IDs list:" + deptIdsList.size());

		return JsonUtility.convertToJson(deptIdsList);
	}


	
}
