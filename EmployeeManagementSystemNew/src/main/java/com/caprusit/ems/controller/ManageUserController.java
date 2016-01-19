package com.caprusit.ems.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeD;
import com.caprusit.ems.domain.JsonEmployee;
import com.caprusit.ems.service.IManageUserService;

@Controller
public class ManageUserController {

	@Autowired
	private IManageUserService manageUserService;
	
	private Logger logger=Logger.getLogger(ManageUserController.class);
	
	/**
	 * This method is to send all employee details to 
	 * front-end in json object array format
	 * */
	@RequestMapping(value="/getAllEmployeeDetails",method=RequestMethod.GET)
	public @ResponseBody String getAllEmployeeDetails(){
		logger.info("inside ManageUserController getAllEmployee()");	
		return manageUserService.getEmployees();
	}
	
	/**
	 * This method is to return add employee page
	 * */
	@RequestMapping(value="/getAddEmployeePage",method=RequestMethod.GET)
	public String getAddEmployeePage(){
		logger.info("inside ManageUserController getAddEmployeePage()");	
		return "AddEmployee";
	}
	
    
	
	
	@RequestMapping(value = "/getExcel", method = RequestMethod.GET)
	 ModelAndView getExcel(HttpServletRequest request,
	   HttpServletResponse response) throws Exception {
	  System.out.println("Calling generateExcel()...");
	  List<Employee> employees =manageUserService.getAllEmployee();	  
	  logger.info("in controller employee list : "+ employees);
	  ModelAndView modelAndView = new ModelAndView("excelView", "employees",employees);
	  logger.info("modelAndView   "+ modelAndView);
	  return modelAndView;
	}
	
	/**
	 * This method is for handling upload excel file(Employee details excel file )  request
	 * returns  success or error details to front-end
	 * */
	@RequestMapping(value = "/uploadEmployeeDetailsExcelFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public @ResponseBody String uploadEmployeeDetailsExcelFile(MultipartHttpServletRequest request) {

		logger.info("inside uploadEmployeeDetailsExcelFile()");
		Iterator<String> itr = request.getFileNames();
		MultipartFile file = request.getFile(itr.next());
		String result = "";
		try {
			result = manageUserService.uploadEmployeeDetailsExcelFile(file.getInputStream(), file.getOriginalFilename());
		} catch (IOException e) {

			e.printStackTrace();
		}
		;
		logger.info("result : " + result);
		return result;
	}
	
	/**
	 * This method is to add single employee 
	 * Takes employee object as request body
	 * If session expired returns -1*/
	@RequestMapping(value = "/addSingleEmployee", method = RequestMethod.POST)
	public @ResponseBody Integer addSingleEmployee(HttpServletRequest request,@RequestBody Employee emp,
			@RequestParam("dob") String milliSeconds) {

		if(!HttpSessionUtility.verifySession(request))
			return -1;
		else
		    return manageUserService.addSingleEmployee(emp, milliSeconds);

	}
	
	/**
	 * This method is to update employee details
	 * Takes employee object as request body
	 * returns 1 on successful update
	 * */
	@RequestMapping(value="/updateEmployee" , method=RequestMethod.POST)
	public @ResponseBody int updateEmployee(@RequestBody Employee emp,@RequestParam("dob") String dobMillisecods){
		
		logger.info("inside manageUser controller updateEmployee()");
		emp.setDob(new Date(Long.parseLong(dobMillisecods)));
		logger.info("employee object received for update: "+emp);
		
		return manageUserService.updateEmployee(emp);
	}
	@RequestMapping(value = "ViewUser")
	public String  updateUser() {
		
		return "UpdateUser";
		
	}
	@RequestMapping(value = "Controller")
	public @ResponseBody List<EmployeeD>  home( ) {
		
		List<EmployeeD> employees=manageUserService.getEmployees2();
		
		System.out.println(employees);
		
		return employees;
		
	}
	@RequestMapping(value = "Controller.do"+"/"+"{employeeid}")
	public @ResponseBody List<EmployeeD>  edit(@PathVariable("employeeid")int employeeid) {
		
		System.out.println(employeeid);
		
		List<EmployeeD> employees=manageUserService.getEmployeeOneTime(employeeid);
		
		System.out.println(employees);
		
		return employees;
		
	}
	@RequestMapping(value = "sendObj", method = RequestMethod.POST)
	public @ResponseBody String  getEmployeeJson(@ModelAttribute JsonEmployee employeeJson) throws ParseException {
		
		
		Employee employee=new Employee();
		
		employee.setEmployeeId(Integer.parseInt(employeeJson.getEmployeeId()));
		employee.setFirstName(employeeJson.getFirstName());
		employee.setLastName(employeeJson.getLastName());
		
		DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
		Date d2 = df2.parse(employeeJson.getDob());
	    java.sql.Date sqlDate = new java.sql.Date(d2.getTime());
	      
		employee.setDob(sqlDate);
		
		employee.setMobileNo(employeeJson.getMobileNo());
		employee.setEmailId(employeeJson.getEmailId());
		employee.setDesignation(employeeJson.getDesignation());
		employee.setRollId(Integer.parseInt(employeeJson.getRollId()));
		employee.setStatus(employeeJson.getStatus());
		employee.setDeptId(Integer.parseInt(employeeJson.getDeptId()));
		
		
		
		
		System.out.println("inside Home controller");
		String message=manageUserService.updateEmployee2(employee);
		System.out.println("outside Home controller");
		
		
		
		System.out.println("Employee from Json data == "+employee);
		return message;
		
		
		
	}

	
}
