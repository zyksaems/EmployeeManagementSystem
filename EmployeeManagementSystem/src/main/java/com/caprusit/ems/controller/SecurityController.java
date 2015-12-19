package com.caprusit.ems.controller;

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

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.service.ISecurityService;
import com.caprusit.ems.utility.JsonUtility;
import com.google.gson.Gson;

@Controller
public class SecurityController {

	@Autowired
	private ISecurityService securityService;

	private Logger logger = Logger.getLogger(SecurityController.class);


	@RequestMapping(value = "/adminLogin", method = RequestMethod.POST)
	public @ResponseBody Integer adminLogin(@RequestBody Admin admin, HttpServletRequest request) {

		logger.info("in admin security controller");
		int status = securityService.login(admin);
		if (status == 1)
			request.getSession().setAttribute("adminId", admin.getAdminId());

		return status;
	}

	/*@RequestMapping(value = "/adminHomePage", method = RequestMethod.GET)
	public ModelAndView getAdminHomePage(HttpServletRequest request) {

		logger.info("inside getAdminHomePage()");

		HttpSession session = request.getSession(false);

		logger.info("session: " + session);
		if (session != null)
			logger.info("admin id in session: " + session.getAttribute("adminId"));

		return ((session != null) && (session.getAttribute("adminId") != null)) ? new ModelAndView("AdminDashBoard")
				: new ModelAndView("AdminLogin");

	}*/

	@RequestMapping(value = "/adminLogout", method = RequestMethod.GET)
	public @ResponseBody int adminLogout(HttpServletRequest request) {

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
	@RequestMapping(value = "/forgotPasswordHome", method = RequestMethod.POST)
	public @ResponseBody String forgotPassword(@RequestParam("id") Integer adminId,@RequestParam("email") String emailId) {
		logger.info("in admin forgot password:  id: " + adminId + "    email: " + emailId);
		return securityService.forgotPassword(adminId, emailId);

	}

	/*
	  * changePassword() method implementation This method takes current password
	  * and new password as parameter and after checking all the conditions it
	  * returns either a successful or an error message to the browser
	  */
	@RequestMapping(value = "/changePassword.do", method = RequestMethod.POST)
	public @ResponseBody String changePassword(HttpServletRequest request, @RequestParam("cpwd") String oldPassword,
			@RequestParam("npwd") String newPassword) {
         if(!HttpSessionUtility.verifySession(request)){
        	 logger.info("session expired!");
        	 return JsonUtility.convertToJson("sessionExpired!");
         }
         else{
		    int adminId = (Integer) request.getSession(false).getAttribute("adminId");
		    logger.info("In change Password:" + adminId);
		    logger.info("old password: "+oldPassword + "   new password:" + newPassword);
		    Admin admin=new Admin();
		    admin.setAdminId(adminId);
		    admin.setPassword(oldPassword);
		    logger.info(admin);
		    int res=securityService.changePassword(admin,newPassword);		
		    logger.info("res for change password: "+res);
		    return JsonUtility.convertToJson(res);
         }
     

	}
	

	 /**
	  * getJsonArray() used to convert Object to String, so that we will send
	  * this String to other layer
	  * 
	  * @param obj
	  * @return  jsonObj
	  */

	 private String getJsonArray(Object obj) {
	  Gson gson = new Gson();
	  return gson.toJson(obj);

	 }
	 
	
}
