package com.caprusit.ems.service.scheduler;

import com.caprusit.ems.dao.IAttendanceDAO;
import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.utility.EmailUtility;

/**
 * 
 * This class holds dao objects for scheduler to schedule jobs
 */
public class SchedulerDaoObjectsUtility {

  public static IAttendanceDAO attendanceDao;

  public static IManageUserDAO manageUserDao;

  public static EmailUtility emailUtility;

  public SchedulerDaoObjectsUtility(IAttendanceDAO attendance, IManageUserDAO manageUser,
      EmailUtility emaily) {
    attendanceDao = attendance;
    manageUserDao = manageUser;
    emailUtility = emaily;
  }

}
