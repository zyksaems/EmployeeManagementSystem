package com.caprusit.ems.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.service.IEmployeeLeaveService;

@Controller
public class EmployeeLeaveController {
	
	@Autowired
	private IEmployeeLeaveService employeeLeaveService;

	private static Logger logger=Logger.getLogger(AttendanceController.class);
	
	 
		@RequestMapping(value="/viewEmployeeLeave",method = RequestMethod.GET)
		public String viewEmployeeLeavePage(HttpServletRequest request ) {

			logger.info("Employee Attendance controller");
			
			return (HttpSessionUtility.verifySession(request,"employeeId")) ? "ShowEmployeeLeaves": "EmsHomePage";
			
		}
		
		@RequestMapping(value = "/getLoggedEmployeeLeaveCount", method = RequestMethod.POST)
		public @ResponseBody String getEmployeeAllLeavesCount(HttpServletRequest request) {
			HttpSession HttpSession = request.getSession(false);
			
			int employeeId=(Integer)HttpSession.getAttribute("employeeId"); 
		System.out.println("in controller AdminId :  "+employeeId);
			logger.info("inside EmployeeLeaveController getLoggedEmployeeLeaveCount()");
			return employeeLeaveService.getEmployeeLeaveCount(employeeId);
		}
		
		@RequestMapping(value = "/getLoggedEmployeeAlleaveDates", method = RequestMethod.POST)
		public @ResponseBody String getEmployeeAllLeaveDates(HttpServletRequest request) {
			HttpSession HttpSession = request.getSession(false);
			
			int employeeId=(Integer)HttpSession.getAttribute("employeeId"); 
		System.out.println("in controller AdminId :  "+employeeId);
			logger.info("inside EmployeeLeaveController getLoggedEmployeeLeaveDates()");
			return employeeLeaveService.getLeaveDates(employeeId);
		}
		
		
		
		@RequestMapping(value = "/getLoggedEmployeeMonthleaveDates", method = RequestMethod.POST)
		public @ResponseBody String getEmployeeMonthLeaveDates(HttpServletRequest request,@RequestParam("month") String month) {
			HttpSession HttpSession = request.getSession(false);
			
			int employeeId=(Integer)HttpSession.getAttribute("employeeId"); 
		System.out.println("in controller AdminId :  "+employeeId);
			logger.info("inside EmployeeLeaveController getLoggedEmployeeMonthLeaveDates()");
			return employeeLeaveService.getMonthLeaveDates(employeeId,month);
		}
		
}
