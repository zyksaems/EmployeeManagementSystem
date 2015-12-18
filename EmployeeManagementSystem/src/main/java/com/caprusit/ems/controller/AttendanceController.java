package com.caprusit.ems.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.domain.LoginTest;
import com.caprusit.ems.service.IAttendanceService;

@Controller
public class AttendanceController {
	
	@Autowired
	private IAttendanceService attendanceService;
	
	private static Logger logger=Logger.getLogger(AttendanceController.class);
	
	@RequestMapping(value="/log",method = RequestMethod.GET)
	public String init(ModelMap modelMap) {

		logger.info("inside attendance controlller init()");
		
		return "login";
		
	}

	@RequestMapping(value="/login",method = RequestMethod.POST)
	public @ResponseBody Integer login(@RequestBody LoginTest test) {
		
		logger.info("inside attendance controller login()");

		return attendanceService.logInOrLogOut(test);
		

	}
	
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String loginPage(ModelMap modelMap) {

		logger.info("inside attendance controlller init()");
		
		return "NewAdminDashboard";
		
	}


	
}
