package com.caprusit.ems.controller;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.ChangePasswordRequest;
import com.caprusit.ems.service.ISecurityService;
import com.caprusit.ems.utility.JsonUtility;

@Controller
public class SecurityController {

	@Autowired
	private ISecurityService securityService;
	
	private Set<Integer> resetPasswordAdminSet=new HashSet<Integer>();
	
	/*This integer represents validity time in  minutes */
	private int passwordLinkValidTime=1;

	private Logger logger = Logger.getLogger(SecurityController.class);

	/**
	 * This method is for admin login functionality 
	 * Takes admin object as request body
	 * Returns 1 on successful login
	 * If admin credentials are correct and creates a session and sets admin ID as attribute to session
	 * */
	@RequestMapping(value = "/adminLogin", method = RequestMethod.POST)
	public @ResponseBody
	Integer adminLogin(@RequestBody Admin admin, HttpServletRequest request) {

		logger.info("in admin security controller");
		int status = securityService.login(admin);
		if (status == 1)
			request.getSession().setAttribute("adminId", admin.getAdminId());

		return status;
	}
	/**
	 * This method is foradmin home page 
	 * If admin id is there in session returns admin home page
	 * otherwise returns error page
	 * */
	@RequestMapping(value = "/adminHomePage", method = RequestMethod.GET)
	public String getAdminHomePage(HttpServletRequest request) {

		logger.info("in admin security controller -- getAdminHomePage()");
		if(HttpSessionUtility.verifySession(request)){
			
			return "adminHome";
		}
		else{
			return "ErrorPage";
		}
		
	}

	/**
	 * This method is for admin logout functionality
	 * Returns 1 on successful logout*/
	@RequestMapping(value = "/adminLogout", method = RequestMethod.GET)
	public @ResponseBody
	int adminLogout(HttpServletRequest request) {

		HttpSession session = request.getSession(false);

		if (session != null) {
			logger.info("invalidating session ");
			session.invalidate();
		}

		logger.error("admin logout successfull :" + request.getSession(false));

		return 1;

	}

	/*
	 * forgotPassword() method takes adminId and emailId as parameter and after
	 * validating both input , it returns success message such as Email Sent
	 * Successfully or error message such as You entered incorrect adminId or
	 * EmailId on the browser.
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/forgotPasswordHome", method = RequestMethod.POST)
	public @ResponseBody int forgotPassword(HttpServletRequest request,@RequestParam("id") Integer adminId,@RequestParam("email") String emailId) {
		ServletContext servletContext= request.getSession().getServletContext();
		resetPasswordAdminSet=(Set<Integer>) servletContext.getAttribute("resetPaswordAdminIdList");
		if(resetPasswordAdminSet == null){
			resetPasswordAdminSet=new HashSet<Integer>();
		}
		resetPasswordAdminSet.add(adminId);
	    logger.info("admin id added to context");
		servletContext.setAttribute("resetPaswordAdminIdList", resetPasswordAdminSet);
	
		logger.info("port number of server: "+request.getServerPort());
		logger.info("name of server: "+request.getServerName());
		String url="http://"+request.getServerName()+":"+request.getServerPort()+"/EmployeeManagementSystem/getResetPasswordPage.do?id="+adminId+"&&pas="+ Calendar.getInstance().getTimeInMillis();
		logger.info("url created for reset password : "+url);
		logger.info("in admin forgot password:  id: " + adminId + "    email: "+ emailId);
		logger.info("reset admin id set(/forgotPasswordHome): "+resetPasswordAdminSet);
		return securityService.forgotPassword(adminId, emailId,url);

	}
	
	/**
	 * This method is returns the JSP page(ModelAndView) to administrator
	 * In this JSP page admin can reset his password
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/ResetPasswordPage", method = RequestMethod.GET)
	public ModelAndView getResetPAsswordPage(HttpServletRequest request,@RequestParam("id") int adminId,@RequestParam("pas") long milliSeconds){
		logger.info("admin id received for reset password  :"+adminId);
		ServletContext servletContext= request.getSession().getServletContext();
		long currentMilliSeconds=Calendar.getInstance().getTimeInMillis();
		Set<Integer> resetAdminIdSet=(Set<Integer>) servletContext.getAttribute("resetPaswordAdminIdList");
		ModelAndView resetAdminModelAndVlew=(resetAdminIdSet != null && resetAdminIdSet.contains(adminId) && (currentMilliSeconds <= milliSeconds+passwordLinkValidTime*60000) )?new ModelAndView("NewAdminDashboard","resetPasswordAdminId",adminId):new ModelAndView("NewAdminDashboard","errorMsg","Sorry, This link expired");
		logger.info("model and view created for reset password: "+resetAdminModelAndVlew);
		logger.info("condition for time checking:   "+(currentMilliSeconds <= milliSeconds+passwordLinkValidTime*60000 ));
		logger.info("condition for time checking    currentTime:-   "+currentMilliSeconds );
		logger.info("condition for time checking    sent+: ++  "+	(currentMilliSeconds <= milliSeconds+passwordLinkValidTime*60000) );
	
		logger.info("reset admin id set(/ResetPasswordPage): "+resetAdminIdSet);
		return resetAdminModelAndVlew;
	}
	
	/**
	 * This method is to reset the admin password
	 * returns 1 after successful reset
	 */
	@RequestMapping(value = "/setNewAdminPassword", method = RequestMethod.POST)
	public @ResponseBody int setNewPassword(HttpServletRequest request,@RequestBody Admin admin){
		ServletContext servletContext= request.getSession(false).getServletContext();
		@SuppressWarnings("unchecked")
		Set<Integer> resetAdminIdSet=(Set<Integer>) servletContext.getAttribute("resetPaswordAdminIdList");
		logger.info("admin received for reset password  :"+admin);		
	     int resultResetPassword=securityService.resetPassword(admin);
	     if(resultResetPassword ==1){
	    	 resetAdminIdSet.remove(admin.getAdminId());
	    	 servletContext.setAttribute("resetPaswordAdminIdList", resetAdminIdSet);	     
	         logger.info("reset admin id set(/setNewAdminPassword): "+resetAdminIdSet);
	         return 1;
	     }
	     else{
	    	 logger.info("reset admin id set(/setNewAdminPassword): "+resetAdminIdSet);
	    	 return 0;
	     }
	}

	/**
	 * changePassword() method implementation This method takes current password
	 * and new password as parameter and after checking all the conditions it
	 * returns either a successful or an error message to the browser
	 */
	@RequestMapping(value = "/changePassword.do", method = RequestMethod.POST)
	public @ResponseBody
	String changePassword(HttpServletRequest request,
			@RequestParam("cpwd") String oldPassword,
			@RequestParam("npwd") String newPassword) {
		if (!HttpSessionUtility.verifySession(request)) {
			logger.info("session expired!");
			return JsonUtility.convertToJson("sessionExpired!");
		} else {
			int adminId = (Integer) request.getSession(false).getAttribute(
					"adminId");
			logger.info("In change Password:" + adminId);
			logger.info("old password: " + oldPassword + "   new password:"
					+ newPassword);
			Admin admin = new Admin();
			admin.setAdminId(adminId);
			admin.setPassword(oldPassword);
			logger.info(admin);
			int res = securityService.changePassword(admin, newPassword);
			logger.info("res for change password: " + res);
			return JsonUtility.convertToJson(res);
		}

	}
	
	/**
	 * changeEmployeePassword() method implementation This method takes current password
	 * and new password as parameter and after checking all the conditions it
	 * returns either a successful or an error message to the browser
	 */
	@RequestMapping(value = "/changeEmployeePassword", method = RequestMethod.POST)
	public @ResponseBody int changeEmployeePassword(@RequestBody ChangePasswordRequest changePasswordData) {
        logger.info("in security controller -- changeEmployeePassword()");
        logger.info("change password request received : "+changePasswordData);
        return  securityService.changeEmployeePassword(changePasswordData);
       
	}

}
