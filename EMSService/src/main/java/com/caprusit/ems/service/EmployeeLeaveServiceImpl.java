package com.caprusit.ems.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IEmployeeLeaveDAO;
import com.caprusit.ems.utility.JsonUtility;

@Service
public class EmployeeLeaveServiceImpl implements IEmployeeLeaveService{

	@Autowired
	private IEmployeeLeaveDAO employeeLeaveDao;
	
	private Logger logger = Logger.getLogger(EmployeeLeaveServiceImpl.class);
	
	public String getEmployeeLeaveCount(int employeeId) {
	
		logger.info("EmployeeLeaveServiceImpl getEmployeeLeaveCount()");
		List<Long> list=employeeLeaveDao.getEmployeeLeaveCount(employeeId);
		System.out.println("json String     "+JsonUtility.convertToJson(list));
		 return JsonUtility.convertToJson(list);
	}

	public String getLeaveDates(int employeeId) {
		logger.info("EmployeeLeaveServiceImpl getLeaveDates()");
	List<Object> list=employeeLeaveDao.getLeaveDates(employeeId);
		
		return JsonUtility.convertToJson(list);
	}

	public String getMonthLeaveDates(int employeeId,String month) {
		
		logger.info("EmployeeLeaveServiceImpl getMonthLeaveDates()");
		
try{
	System.out.println(month);
		 /*String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     
	     int month_parseyear=Integer.parseInt(month_year);
	     int month_parsemonthnumber=Integer.parseInt(month_monthnumber);
	     
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.DAY_OF_MONTH, 1);
	     calendar.set(Calendar.MONTH, month_parsemonthnumber-1);
	     calendar.set(Calendar.YEAR, month_parseyear);
	     
	     Date dateOfMonth1 = calendar.getTime();
	     
	     calendar.set(Calendar.DAY_OF_MONTH,
	    		  calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
	     
	     System.out.println(dateOfMonth1);
	     //calendar.clear();
	  //   Calendar cal2=Calendar.getInstance();
	     
	     Date dateOfMonth2= calendar.getTime();*/
	    		 
	     
	    /* calendar.set(Calendar.DAY_OF_MONTH,
	    		  calendar.getActualMaximum(Calendar.DAY_OF_MONTH));*/
	    /* System.out.println(dateOfMonth2);*/
	         
         List<Object> list=employeeLeaveDao.getMonthLeaveDates(employeeId,month);
         return JsonUtility.convertToJson(list);
            }
                catch(Exception e)
             {
	
	               e.printStackTrace();
                       return null;
                     }
		
	}

}
