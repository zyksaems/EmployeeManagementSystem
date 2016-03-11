package com.caprusit.ems.controller;

import java.util.Date;

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

import com.caprusit.ems.conditions.EmsConditions;
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
		
		@RequestMapping(value="/viewEmployeeLeaveStatus",method = RequestMethod.GET)
		public String viewEmployeeLeaveStatusPage(HttpServletRequest request ) {

			logger.info("Employee Attendance controller viewEmployeeLeaveStatusPage()");
			
			return (HttpSessionUtility.verifySession(request,"employeeId")) ? "EmployeeViewLeaveStatus": "EmsHomePage";
			
		}
		/* Method to return view pending leaves page */
		@RequestMapping(value="/getPendingLeavesPage",method = RequestMethod.GET)
		public String viewPendingLeavesPage(HttpServletRequest request ) {

			logger.info("Employee Attendance controller viewApprovedLeavesPage()");
			
			return (HttpSessionUtility.verifySession(request,"adminId")) ? "AdminViewPendingLeaves": "EmsHomePage";
			
		}
		/* Method to return view disapproved leaves page */
		@RequestMapping(value="/getDisApprovedLeavesPage",method = RequestMethod.GET)
		public String viewDisApprovedLeavesPage(HttpServletRequest request ) {

			logger.info("Employee Attendance controller viewDisApprovedLeavesPage()");
			
			return (HttpSessionUtility.verifySession(request,"adminId")) ? "AdminViewDisapprovedLeaves": "EmsHomePage";
			
		}
		/* Method to return view approved leaves page */
		@RequestMapping(value="/getApprovedLeavesPage",method = RequestMethod.GET)
		public String viewApprovedLeavesPage(HttpServletRequest request ) {

			logger.info("Employee Attendance controller viewApprovedLeavesPage()");
			
			return (HttpSessionUtility.verifySession(request,"adminId")) ? "AdminViewApprovedLeaves": "EmsHomePage";
			
		}
		/**
		 * 
		 * @param request servlet request to verify session 
		 * @param appliedMonth month in which applied for leave EX: 2016-04
		 * @param empId employee id 
		 * @return JSON object array of leave details
		 */
		@RequestMapping(value="/verifyEmployeeLeaveStatus",method = RequestMethod.POST)
		public @ResponseBody String verifyEmployeeLeaveStatus(HttpServletRequest request,@RequestParam("leaveAppliedMonth") String appliedMonth,
				                           @RequestParam("employeeId") Integer empId){
			if(HttpSessionUtility.verifySession(request, "employeeId")){
				
				logger.info("month received for view leave status: "+appliedMonth);
				return employeeLeaveService.verifyEmployeeLeaveStatus(empId, appliedMonth);
			}
			else
				return "-1";
			
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
		    logger.info("in controller AdminId :  "+employeeId);
			logger.info("inside EmployeeLeaveController getLoggedEmployeeMonthLeaveDates()");
			return employeeLeaveService.getMonthLeaveDates(employeeId,month);
		}

		/**
		 * This method is to give page to apply for leave
		 * @param request HttpServletRequest object to verify session
		 * @return apply leave page if session exists
		 *          home page if session expires
		 */
		@RequestMapping(value = "/applyForLeave",method = RequestMethod.GET)
		public String applyForLeave(HttpServletRequest request){
			
			return (HttpSessionUtility.verifySession(request, "employeeId")) ? "ApplyLeaveForEmployee" : "EmsHomePage";
		}
		/**
		 * This method is to apply for leave 
		 * @param request HttpServletRequest object to verify session
		 * @param employeeLeave EmployeeLeave class object 
		 * @param leaveDates string of leave dates to apply for leave
		 * @return  1 on successfully applied.
		 *          0 if unsuccessful
		 *         -1 if session expires
		 */
		@RequestMapping(value = "/employeeApplyForLeave",method = RequestMethod.POST)
		public  @ResponseBody int applyLeave(HttpServletRequest request,@ModelAttribute EmployeeLeave employeeLeave,@RequestParam("leaveDates") String leaveDates){
			if(HttpSessionUtility.verifySession(request, "employeeId")){
				employeeLeave.setDate_of_apply(new Date());
				employeeLeave.setIsApproved(EmsConditions.EMPLOYEE_LEAVE_PENDING);
				System.out.println("============="+employeeLeave);
				
				logger.info("leqave dates received: "+leaveDates);
				return employeeLeaveService.applyLeave(employeeLeave,leaveDates);
			}
			else{
				return -1;
			}
			
		}
		@RequestMapping(value = "/getEmployeeLeaveNotification",method = RequestMethod.GET)
		public @ResponseBody String getEmployeeLeaveNotification(@RequestParam("employeeId")int employeeId){
			
			
			System.out.println("loggedEmployeeId :"+employeeId);
			
			String l=employeeLeaveService.getEmployeeLeaveNotification(employeeId);
			
			logger.info("list size for  employee leave notification: "+l);
			return l;
			
		}
		
		@RequestMapping(value = "/getEmployeeLeaveView",method = RequestMethod.GET)
		public String getEmployeeLeaveDetailsView(HttpServletRequest request){
			
			return (HttpSessionUtility.verifySession(request, "adminId"))? "AdminViewAllLeaves" : "EmsHomePage" ; 
			
		}
		
		
		@RequestMapping(value = "/getAllLeave",method = RequestMethod.POST)
		public @ResponseBody String getEmployeeLeaveDetails(HttpServletRequest request){
			    if(HttpSessionUtility.verifySession(request, "adminId")){
				    return employeeLeaveService.getEmployeeLeaveDetails();
			     }
			     else
				    return "-1";						
		}
		
		/**
		 * this method is to approve/disapprove employee leave request
		 * @param request to verify session
		 * @param leaveId  leave  Id primary key
		 * @param status status 1 for approving, 0 for disapproving
		 * @return 1 if success, -1 if session expires,0 if fails
		 */
		@RequestMapping(value = "/updateEmployeeLeaveStatus",method = RequestMethod.POST)
		public @ResponseBody int updateLeaveStatus(HttpServletRequest request,@RequestParam("leaveId") int leaveId,@RequestParam("status") int status){						
			logger.info("employeeLeaveId :"+leaveId +"   status received: "+status);			
			if(HttpSessionUtility.verifySession(request, "adminId"))
				return employeeLeaveService.updateLeaveStatus(leaveId,status); 
			else
				return -1;
		}
		/*method to get all pending leave details*/
		@RequestMapping(value = "/getAllPendingLeaves",method = RequestMethod.POST)
		public @ResponseBody String getAllPendingLeaves(HttpServletRequest request){						
			
			if(HttpSessionUtility.verifySession(request, "adminId"))
				return employeeLeaveService.getAllPendingLeaves();
			else
				return "-1";
		}
		
		/* method to get approved leave details  based on given month  Example moth format: 2016-03 */
		@RequestMapping(value = "/getApprovedLeavesByMonth",method = RequestMethod.POST)
		public @ResponseBody String getApprovedLeavesByMonth(HttpServletRequest request,@RequestParam("month") String month){			
			 logger.info("month received: "+month);
			if(HttpSessionUtility.verifySession(request, "adminId")){				
				return employeeLeaveService.getApprovedLeavesByMonth(month);
			}				
			else
				return "-1";
		}
		
		/* method to get all disapproved leave details */
		@RequestMapping(value = "/getAllDisapprovedLeaves",method = RequestMethod.POST)
		public @ResponseBody String getAllDisApprovedLeaves(HttpServletRequest request){			
			if(HttpSessionUtility.verifySession(request, "adminId")){				
				return employeeLeaveService.getAllDisapprovedLeaves();
			}				
			else
				return "-1";
		}
		
		/* method to get all leave details for a given month*/
		@RequestMapping(value = "/getAllLeavesforMonth",method = RequestMethod.POST)
		public @ResponseBody String getAllLeavesByGivenMonth(HttpServletRequest request,@RequestParam("month") String month){			
			 logger.info("month received: "+month);
			if(HttpSessionUtility.verifySession(request, "adminId")){				
				return employeeLeaveService.getLeavesDetailsByGivenMonth(month);
			}				
			else
				return "-1";
		}
		
		@RequestMapping(value = "/getNewNotificationCount",method = RequestMethod.POST)
		public @ResponseBody int getNotificationCount(){						
			logger.info("loading count .............");
			//Long l=4L;
				//return employeeLeaveService.getNewNotificationCount();
			int count=employeeLeaveService.getNewNotificationCount();
			
			return count;
		}
		
		@RequestMapping(value = "/getNotificationData", method = RequestMethod.POST)
		public @ResponseBody String getNewNotificationData() {
			return employeeLeaveService.getNewNotificationData();
		}
				
}
