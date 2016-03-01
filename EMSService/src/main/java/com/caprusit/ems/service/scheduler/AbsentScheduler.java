package com.caprusit.ems.service.scheduler;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.domain.Attendance;

@Component("absentQuartzScheduler")
public class AbsentScheduler {
	
	private Logger logger=Logger.getLogger(AbsentScheduler.class);
	
	private Attendance  attendanceObj;
	private Object [] employeeDetails;
	private Date todayDate=Calendar.getInstance().getTime();
	
	@Transactional(rollbackFor=HibernateException.class,readOnly=false)
	public void updateAbsentEmployees(){
		
		logger.info("running absent scheduler at: "+new Date());
		
          List<Object> absentDetailsList=SchedulerDaoObjectsUtility.attendanceDao.getAbsentEmployeeDetails();
          logger.info("Number of absenties: "+absentDetailsList.size());
          for(Object empdetails: absentDetailsList){
        	  
        	  employeeDetails=(Object[]) empdetails;
        	  logger.info("employee id : "+employeeDetails[0] +" employee name: "+employeeDetails[1]+" "+employeeDetails[2]+"  email: "+employeeDetails[3]);
        	  attendanceObj=new Attendance();
        	  attendanceObj.setEmployeeId((Integer)employeeDetails[0]);
        	  attendanceObj.setAttendanceDate(todayDate);
        	  attendanceObj.setDayIndicator(EmsConditions.EMPLOYEE_ABSENT_STATUS);
        	  attendanceObj.setStartTime(todayDate);
        	  attendanceObj.setEndTime(todayDate);
        	  logger.info("absent   attendance object: "+attendanceObj);       	  
        	  
        	  //SchedulerDaoObjectsUtility.attendanceDao.inTime(attendanceObj);
        	  
        	  String absentmessage="\n\n\n \t You are not logged into EMS today. \n\n\n \t Your attendance is posted as absent ";
        	  try{
        		  SchedulerDaoObjectsUtility.emailUtility.sendMail((String)employeeDetails[3], absentmessage, employeeDetails[1]+" "+employeeDetails[2], "EMS Absent alert");  
        	  }
        	  catch(Exception e){
        		logger.error("exception while sending  absent mail to employee id : "+employeeDetails[0]);  
        	  }
        	  
        	  
          }
		
	}
	

}
