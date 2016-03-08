package com.caprusit.ems.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.domain.EmployeeLeave;
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

		/**
		 *This method is to populate ApplyLeaveForEmployee.jsp page 
		 */

		@RequestMapping(value = "/applyForLeave",method = RequestMethod.GET)
		public String applyForLeave(HttpServletRequest request){
			
			return (HttpSessionUtility.verifySession(request,"employeeId")) ? "ApplyLeaveForEmployee": "EmsHomePage";
		}
		
		@RequestMapping(value = "/applyLeave",method = RequestMethod.POST)
		public  @ResponseBody void applyLeave(@ModelAttribute EmployeeLeave employeeLeave,HttpServletRequest request){
			
			final String  not_approved="Not Approved";
			final String  approved="Approved";
			final String  pending="Pending";
			employeeLeave.setDate_of_apply(new Date());
			employeeLeave.setIsApproved(pending);
			System.out.println("============="+employeeLeave);
			
			
			
			employeeLeaveService.applyLeave(employeeLeave);
			
			
		}
		@RequestMapping(value = "/getEmployeeLeaveNotification",method = RequestMethod.GET)
		public @ResponseBody List<EmployeeLeave> getEmployeeLeaveNotification(@RequestParam("employeeId")int employeeId){
			
			
			System.out.println("loggedEmployeeId :"+employeeId);
			
			return employeeLeaveService.getEmployeeLeaveNotification(employeeId);
			
		}
		
		@RequestMapping(value = "/getEmployeeLeaveView",method = RequestMethod.GET)
		public String getEmployeeLeaveDetailsView(HttpServletRequest request){
			
			return (HttpSessionUtility.verifySession(request,"adminId")) ? "AllEmployeeLeaveDetails" : "EmsHomePage";
			
		}
		
		
		@RequestMapping(value = "/getAllLeave",method = RequestMethod.GET)
		public @ResponseBody List<EmployeeLeave> getEmployeeLeaveDetails(){
			
			return employeeLeaveService.getEmployeeLeaveDetails();
			
		}
		
		@RequestMapping(value = "/doApprove",method = RequestMethod.POST)
		public @ResponseBody int doApproveLeaves(@ModelAttribute EmployeeLeave employeeLeave){
			
			int eid=employeeLeave.getLeaveId();
			System.out.println("employeeLeaveId :"+eid);
			
			int result=employeeLeaveService.doApprove(eid);
			return result;
		}
		
		@RequestMapping(value = "/disApprove",method = RequestMethod.POST)
		public @ResponseBody int doDisApproveLeaves(@ModelAttribute EmployeeLeave employeeLeave){
			
			int eid=employeeLeave.getLeaveId();
			System.out.println("employeeLeaveId :"+eid);
			
			int result=employeeLeaveService.disApproveLeaves(eid);
			return result;
		}

		
		
}
