package com.caprusit.ems.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.service.IManageUserService;

@Controller
public class ManageUserController {

	@Autowired
	private IManageUserService manageUserService;
	
	private Logger logger=Logger.getLogger(ManageUserController.class);
	
	@RequestMapping(value="/getAllEmployee",method=RequestMethod.GET)
	public @ResponseBody String getAllEmployee(){
		logger.info("inside ManageUserController getAllEmployee()");	
		return manageUserService.getEmployees();
	}
	
}
