package com.caprusit.ems.controller.utility;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class HttpSessionUtility {
	
	private static Logger logger=Logger.getLogger(HttpSessionUtility.class);

	public static  boolean verifySession(HttpServletRequest request) {

		HttpSession HttpSession = request.getSession(false);
		logger.info("in HttpSessionUtility class");
		if (HttpSession != null) {
			logger.info("adminid in session: " + HttpSession.getAttribute("adminId"));
		} else {
			logger.info("session expired!!");
		}

		return ((HttpSession != null) && (HttpSession.getAttribute("adminId") != null)) ? true : false;

	}

}
