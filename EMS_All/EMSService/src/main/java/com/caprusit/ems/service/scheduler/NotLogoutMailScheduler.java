package com.caprusit.ems.service.scheduler;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.domain.Employee;

@Component("notLogoutMailQuartzScheduler")
public class NotLogoutMailScheduler {

  private Logger logger = Logger.getLogger(NotLogoutMailScheduler.class);

  @Transactional(readOnly = true)
  public void runSchedulerToRemindEmployees() {

    logger.info("running not logout scheduler at: " + new Date());

    List<Integer> li = SchedulerDaoObjectsUtility.attendanceDao.getStillWorkingEmployeeIds();
    for (Integer empId : li) {

      Employee emp = SchedulerDaoObjectsUtility.manageUserDao.findById(empId);
      String message = "\n\n\n \t You are not logged out from office.Please log out if you want to leave \n\n\n \t NOTE: We will remind you in next "
          + EmsConditions.NOT_LOGOUT_REMIND_TIME + " minutes";
      logger.info("SchedulerDaoObjectsUtility.emailUtility.  object"
          + SchedulerDaoObjectsUtility.emailUtility);
      SchedulerDaoObjectsUtility.emailUtility.sendMail(emp.getEmailId(), message,
          emp.getFirstName() + " " + emp.getLastName(), "Alert from EMS");
      logger.info("Not log-out alert mail sent to employee id  " + empId + "  email id:  "
          + emp.getEmailId());
    }

  }

}
