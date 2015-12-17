package com.caprusit.ems.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.service.IManageUserService;

@Controller
public class ManageUserController {

	@Autowired
	private IManageUserService manageUserService;
	
	private Logger logger=Logger.getLogger(ManageUserController.class);
	
	/*@RequestMapping(value="/getAllEmployee",method=RequestMethod.GET)
	public @ResponseBody String getAllEmployee(){
		logger.info("inside ManageUserController getAllEmployee()");	
		return manageUserService.getEmployees();
	}
	*/

	@RequestMapping(value="/getAllEmployee",method=RequestMethod.GET)
	public  String getAllEmployee(){
		logger.info("inside ManageUserController getAllEmployee()");	
		return "UserManagement2";
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
	
}
