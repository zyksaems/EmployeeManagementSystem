package com.caprusit.ems.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.domain.EmployeeAttendanceRequest;
import com.caprusit.ems.service.IAttendanceService;

@Controller
public class AttendanceController {
	
	@Autowired
	private IAttendanceService attendanceService;
	
	private static Logger logger=Logger.getLogger(AttendanceController.class);
	
	/**
	 * This method will receive login or logout request from front-end with LoginTest Object as request body
	 * This method is for inserting and updating employee attendance 
	 * */
	@RequestMapping(value="/login",method = RequestMethod.POST)
	public @ResponseBody Integer login(@RequestBody EmployeeAttendanceRequest test) {
		
		logger.info("inside attendance controller login()");

		return attendanceService.logInOrLogOut(test);
		

	}
	
	/**
	 * This method will return our application home page to the browser
	 * */
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String getHomePage( ) {

		logger.info("inside attendance controlller init()");
		
		return "NewAdminDashboard";
		
	}
	
	/**
	 * This method takes attendance request
	 * returns 1 on successful login/logout
	 * returns 0 if password is wrong
	 * returns -1 if any problem occurs 
	 * */
	@RequestMapping(value="/secureLogin",method = RequestMethod.POST)
	public @ResponseBody int postEmployeeAttendance(@RequestBody  EmployeeAttendanceRequest attendanceRequest) {

		logger.info("inside attendance controlller -- postEmployeeAttendance()");
		logger.info("attendance request received: "+attendanceRequest);
		
		return attendanceService.EmployeeLogInOrLogOut(attendanceRequest);
		
	}


	
}
