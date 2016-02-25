package com.caprusit.ems.utility;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.IAttendanceDAO;
import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.domain.Employee;

@Component("quartzScheduler")
public class SchedulerUtility {
	
	@Autowired
	private IAttendanceDAO attendanceDao;
	
	@Autowired
	private IManageUserDAO manageUserDao;
	
	@Autowired
	private EmailUtility emialUtility;
	
	private Logger logger=Logger.getLogger(SchedulerUtility.class);
	
	public void  runSchedulerToRemindEmployees(){
		
		logger.info("quartz schduler executing time: "+new Date());			
		
				List<Object> li=attendanceDao.getStillWorkingEmployeeIds();						
				for(Object o: li){
					Object [] arr=(Object[]) o;
					Employee emp=manageUserDao.findById((Integer)arr[0]);
					String message="\n\n\n \t You are not logged out from office.Please log out if you want to leave \n\n\n \t NOTE: We will remind you in next "+
					                                  EmsConditions.NOT_LOGOUT_REMIND_TIME+" minutes";
					emialUtility.sendMail(emp.getEmailId(), message, emp.getFirstName()+" "+emp.getLastName(),"Alert from EMS");							
					logger.info("Not log-out alert mail sent to employee id "+ arr[0] +"  email id:  "+emp.getEmailId());
				}
			
		
		
	}

	

}
