package com.caprusit.ems.controller.utility;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * This class is a utility class for verifying session
 */
public class HttpSessionUtility {

  private static Logger logger = Logger.getLogger(HttpSessionUtility.class);

  /**
   * This method verify session is alive or not If session is not alive returns false If session is
   * alive returns true.
   * 
   */
  public static boolean verifySession(HttpServletRequest request, String attributeName) {

    HttpSession HttpSession = request.getSession(false);
    logger.info("in HttpSessionUtility class");
    if (HttpSession != null) {
      Object attributeValue = HttpSession.getAttribute(attributeName);
      logger.info("adminid/employee in session: " + attributeValue);
      if (attributeValue != null)
        return true;
      else
        return false;
    } else {
      logger.info("session expired!!");
      return false;
    }

  }

}
