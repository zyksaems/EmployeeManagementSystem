package com.caprusit.ems.utility;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
	
	private Long  prevousExecutingTime,currentTime,oneMin_mills=(long) (60*1000);
	
	private Logger logger=Logger.getLogger(SchedulerUtility.class);
	
	public SchedulerUtility(){
		prevousExecutingTime=System.currentTimeMillis();
	}
	public void  runSchedulerToRemindEmployees(){
	
		currentTime=System.currentTimeMillis();
				
			if((prevousExecutingTime + oneMin_mills) < currentTime ){
				logger.info("+++++++++++++++++++++++++++++++++++   executing    +++++++++++++++++++++++++++++++++++");
				logger.info("prevoius exeuting time: "+prevousExecutingTime);
				logger.info("current executing time: "+currentTime);
				prevousExecutingTime=currentTime;			
				List<Object> li=attendanceDao.getStillWorkingEmployeeIds();						
				for(Object o: li){
					Object [] arr=(Object[]) o;
					Employee emp=manageUserDao.findById((Integer)arr[0]);
					String message="\n\n\n \t You are not logged out from office.Please log out if you want to leave \n\n\n \t NOTE: We will remind you in next 30 minutes";
					emialUtility.sendMail(emp.getEmailId(), message, emp.getFirstName()+" "+emp.getLastName(),"Alert from EMS");							
					logger.info("not logout alert mail sent to employee id "+arr[0]);
				}
			}
			else{
				logger.info("--------------------------  cond filed     not executing ---------------------------------------");
				logger.info("prevoius exeuting time: "+prevousExecutingTime);
				logger.info("current executing time: "+currentTime);
			}

		
		
	}

	

}
