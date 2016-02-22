package com.caprusit.ems.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeForDate;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.JsonEmployee;
import com.caprusit.ems.utility.EncryptionUtility;
import com.caprusit.ems.utility.JsonUtility;
import com.caprusit.ems.utility.UploadExcelFileUtility;

@Service
public class ManageUserServiceImpl implements IManageUserService {

	@Autowired
	private IManageUserDAO manageUserDAO;

	@Autowired
	private UploadExcelFileUtility excelFileUtility;

	private List<Employee> users;

	private Logger logger = Logger.getLogger(ManageUserServiceImpl.class);

	public String getEmployees() {

		logger.info("inside ManageUserServiceImpl getEmployees()");
		List<Employee> employeeList = manageUserDAO.getEmployees();
		return JsonUtility.convertToJson(employeeList);
	}

	public List<Employee> getAllEmployee() {

		List<Employee> employeeList = manageUserDAO.getEmployees();
		return employeeList;
	}

	public List<Employee> findAllUsers() {

		System.out.println("Inside Userservice findAllUsers()");
		List<Employee> allEmpData = manageUserDAO.getEmployees();
		users = allEmpData;
		System.out.println(allEmpData.toString());
		return allEmpData;
	}

	public Employee findById(int id) {
		for (Employee user : users) {
			if (user.getEmployeeId() == id) {
				System.out.println("In UserService fingById()");
				Employee oneUser = manageUserDAO.findById(id);
				System.out.println("oneUser=" + oneUser);
				return oneUser;
			}
		}
		return null;
	}

	public void updateUser(Employee user) {
		System.out.println("In updatUser() all users=" + users);
		System.out.println("provided user=" + user);
		int index = users.indexOf(user);
		System.out.println("index of user= " + index);
		// users.set(index, user);

		((ManageUserServiceImpl) manageUserDAO).updateUser(user);
	}

	public String uploadEmployeeDetailsExcelFile(InputStream excelInputStream, String fileName) {

		logger.info("in upload file(service)");
		Workbook workbook = null;
		String[] extensionArray = fileName.split("[.]");
		logger.info("arrays isze: " + extensionArray.length);

		try {

			if (extensionArray[1].equals("xls")) {
				workbook = new HSSFWorkbook(excelInputStream);
				logger.info("2003 file");
			} else {
				logger.info("2007 file");
				workbook = new XSSFWorkbook(excelInputStream);
			}

		} catch (IOException e) {

			e.printStackTrace();
		}

		return excelFileUtility.saveExcelFileData(workbook);

	}

	/**
	 * @param emp Employee object to be saved into database
	 * @param milliseconds  Date of birth of employee in milliseconds
	 * @return int returns 1 if employee successfully saved 
	 *                     0 if employee not saved successfully
	 */
	public int addSingleEmployee(Employee emp, String milliseconds) {
		emp.setDob(new Date(Long.valueOf(milliseconds)));
		// return securityDAO.saveEmployee(emp);
		logger.info("employee in service: " + emp);
		// save employee object
		int id=manageUserDAO.saveEmployee(emp);
		if(id == 1){
			EncryptedEmployee encEmp=new EncryptedEmployee();
			encEmp.setEmployeeId(emp.getEmployeeId());
			encEmp.setEncryptedPassword(EncryptionUtility.encryptString(String.valueOf(emp.getEmployeeId())));
			//save EncryptedEmployee to save Encrypted password of employee
			id=manageUserDAO.saveEncryptedEmployee(encEmp);
		}
		return (id >= 1)? 1 : 0;
	}

	public int updateEmployee(Employee employee) {

		return manageUserDAO.updateEmployee(employee);

	}
	@Transactional(propagation=Propagation.REQUIRED , readOnly=true)
	public List<JsonEmployee> getAllEmployeesData() {

		List<EmployeeForDate> employees = manageUserDAO.getAllEmployeesData();

		Iterator<EmployeeForDate> iterator = employees.iterator();
		List<JsonEmployee> employeejsonList = new ArrayList<JsonEmployee>();
		while (iterator.hasNext()) {
			EmployeeForDate employee = iterator.next();
			JsonEmployee employeejson = new JsonEmployee();
			employeejson.setEmployeeId(employee.getEmployeeId()+"");
			employeejson.setFirstName(employee.getFirstName());
			employeejson.setLastName(employee.getLastName());
			employeejson.setDob(new SimpleDateFormat("yyyy-MM-dd").format(employee.getDob()));
			employeejson.setMobileNo(employee.getMobileNo());
			employeejson.setEmailId(employee.getEmailId());
			employeejson.setDesignation(employee.getDesignation());
			employeejson.setRollId(employee.getRoleType());
			employeejson.setStatus(employee.getStatus());
			employeejson.setDeptId(employee.getDeptName());

			employeejsonList.add(employeejson);

		}

		return employeejsonList;

	}
	@Transactional(propagation=Propagation.NESTED)
	public String updateEmployeeData(Employee e) {
		System.out.println("Inside home service");
		Integer rows = manageUserDAO.updateEmployeeData(e);
		System.out.println("inside home service");
		String message = "Updated rows are ( " + rows + ")";

		return message;
	}

	

}
