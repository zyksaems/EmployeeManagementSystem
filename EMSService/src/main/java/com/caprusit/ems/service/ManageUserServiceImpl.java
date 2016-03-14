package com.caprusit.ems.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
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
import com.caprusit.ems.domain.Notice;
import com.caprusit.ems.domain.ProfileImage;
import com.caprusit.ems.domain.SetProfileImage;
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

	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public String getEmployees() {

		logger.info("inside ManageUserServiceImpl getEmployees()");
		List<Employee> employeeList = manageUserDAO.getEmployees();
		return JsonUtility.convertToJson(employeeList);
	}

	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public List<Employee> getAllEmployee() {

		List<Employee> employeeList = manageUserDAO.getEmployees();
		return employeeList;
	}

	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public List<Employee> findAllUsers() {

		logger.info("Inside Userservice findAllUsers()");
		List<Employee> allEmpData = manageUserDAO.getEmployees();
		users = allEmpData;
		logger.info(allEmpData.toString());
		return allEmpData;
	}

	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public Employee findById(int id) {
		for (Employee user : users) {
			if (user.getEmployeeId() == id) {
				logger.info("In UserService fingById()");
				Employee oneUser = manageUserDAO.findById(id);
				logger.info("oneUser=" + oneUser);
				return oneUser;
			}
		}
		return null;
	}

	@Transactional(rollbackFor=SQLException.class)
	public void updateUser(Employee user) {
		logger.info("In updatUser() all users=" + users);
		logger.info("provided user=" + user);
		int index = users.indexOf(user);
		logger.info("index of user= " + index);
		// users.set(index, user);

		((ManageUserServiceImpl) manageUserDAO).updateUser(user);
	}

	@Transactional(rollbackFor=SQLException.class)
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
	@Transactional(rollbackFor=SQLException.class)
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

	@Transactional(rollbackFor=SQLException.class)
	public int updateEmployee(Employee employee) {

		return manageUserDAO.updateEmployee(employee);

	}
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=SQLException.class , readOnly=true)
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
	
	@Transactional(propagation=Propagation.NESTED,rollbackFor=SQLException.class)
	public String updateEmployeeData(Employee e) {
		logger.info("Inside home service");
		Integer rows = manageUserDAO.updateEmployeeData(e);
		logger.info("inside home service");
		String message = "Updated rows are ( " + rows + ")";

		return message;
	}
	

	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public List<Notice> getNotice(){
		List<Notice> notice=manageUserDAO.getNotice();
		return notice;
	}
	
	@Transactional(rollbackFor=SQLException.class)
	public void deleteNotice(Notice data){
		logger.info("In homeService");
		manageUserDAO.deleteNotice(data);
		
	}
	
	@Transactional(rollbackFor=SQLException.class)
	public void setNotice(Notice data){
		logger.info("In homeService");
		manageUserDAO.setNotice(data);
		
	}
	@Transactional(rollbackFor=SQLException.class)
	public void setPic(ProfileImage profileImage,SetProfileImage setProfileImage){
		
		byte[] bb=profileImage.getImageString().getBytes();
		System.out.println("The bytes"+bb);
		
		manageUserDAO.setPic(profileImage,setProfileImage);
	}
	public  SetProfileImage getPic(int employeeId){
		
		return manageUserDAO.getPic(employeeId);
		
	}

}
