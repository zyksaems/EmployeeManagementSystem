package com.caprusit.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	
}
