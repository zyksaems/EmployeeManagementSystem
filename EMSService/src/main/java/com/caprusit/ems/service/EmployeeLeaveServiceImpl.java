package com.caprusit.ems.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.IAttendanceDAO;
import com.caprusit.ems.dao.IEmployeeLeaveDAO;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.EmployeeLeave;
import com.caprusit.ems.domain.EmployeeLeaveDates;
import com.caprusit.ems.utility.JsonUtility;

@Service
public class EmployeeLeaveServiceImpl implements IEmployeeLeaveService{

	@Autowired
	private IEmployeeLeaveDAO employeeLeaveDao;
	
	@Autowired
	private IAttendanceDAO attendanceDAO;
	
	private Logger logger = Logger.getLogger(EmployeeLeaveServiceImpl.class);
	
	@Transactional(rollbackFor=HibernateException.class)
	public String getEmployeeLeaveCount(int employeeId) {
	
		logger.info("EmployeeLeaveServiceImpl getEmployeeLeaveCount()");
		List<Long> list=employeeLeaveDao.getEmployeeLeaveCount(employeeId);
		System.out.println("json String     "+JsonUtility.convertToJson(list));
		 return JsonUtility.convertToJson(list);
	}
	@Transactional(rollbackFor=HibernateException.class)
	public String getLeaveDates(int employeeId) {
		logger.info("EmployeeLeaveServiceImpl getLeaveDates()");
	List<Object> list=employeeLeaveDao.getLeaveDates(employeeId);
		
		return JsonUtility.convertToJson(list);
	}
	@Transactional(rollbackFor=HibernateException.class)
	public String getMonthLeaveDates(int employeeId,String month) {
		
		logger.info("EmployeeLeaveServiceImpl getMonthLeaveDates()");
		
		try{
	         
         List<Object> list=employeeLeaveDao.getMonthLeaveDates(employeeId,month);
         return JsonUtility.convertToJson(list);
            }
                catch(Exception e)
             {
	
	               e.printStackTrace();
                       return null;
                     }
		
	}
		@Transactional(rollbackFor=HibernateException.class)
		public int applyLeave(EmployeeLeave employeeLeave,String leaveDates){
		     String [] leaveDateArray=leaveDates.split(",");
		     SimpleDateFormat dateFormat=new SimpleDateFormat("dd/MM/yyyy");
		     Set<EmployeeLeaveDates> leaveDatesSet=new HashSet<EmployeeLeaveDates>();
		     for(int i=0;i< leaveDateArray.length;i++){		    	 		
		    	 try {
					//logger.info("date  in date "+dateFormat.parse(leaveDateArray[i]));
					leaveDatesSet.add(new EmployeeLeaveDates(dateFormat.parse(leaveDateArray[i])));
				} catch (ParseException e) {					
					e.printStackTrace();
					return 0;
				}
		    	 
		     }
		     // logger.info("employee leave dates et :  "+leaveDatesSet);
		     employeeLeave.setSetOfLeaveDates(leaveDatesSet);		     
		     employeeLeave.setNotifyStatus(0);
			 return employeeLeaveDao.applyLeave(employeeLeave);
		}
		
	   @Transactional(rollbackFor=HibernateException.class)
		public String getEmployeeLeaveNotification(int employeeId){
			
			List<EmployeeLeave> leaveDetails= employeeLeaveDao.getEmployeeLeaveNotification(employeeId);
			
			return JsonUtility.convertToJson(leaveDetails);
		}
	    /**
	     * This method is to read all employee leave details
	     * 
	     * @return returns whole employee leave details in JSON object array format
	     */
		@Transactional(rollbackFor=HibernateException.class,readOnly=true)
		public String getEmployeeLeaveDetails(){
			
			return JsonUtility.convertToJson(employeeLeaveDao.getEmployeeLeaveDetails());
			
		}
		/**
		 * This method is to update employee leave status as approved or disapproved
		 * if leave approved then inserts record into attendance table with day indicator as leave
		 * @param employeeLeaveId  Employee leave class object id 
		 * @param leaveStatus pass 1 for approving leave, and 0 for rejecting leave
		 * @return returns 1 on successful update. 0 if fail to update
		 */
		@Transactional(rollbackFor=HibernateException.class)
		public int updateLeaveStatus(int employeeLeaveId,int leaveStatus){			
			EmployeeLeave leaveObject=employeeLeaveDao.getEmployeeLeaveDetaisByLeaveId(employeeLeaveId);
	    	 Set<EmployeeLeaveDates> setOfDates=leaveObject.getSetOfLeaveDates();
	    	 logger.info("number of days applied:  "+ setOfDates.size());
		    if(leaveStatus == 1){		    	 
		    	 for(EmployeeLeaveDates dates: setOfDates){
		    		 logger.info("approving leave on :  "+ dates.getLeaveDate()+"  for employee id: "+leaveObject.getEmployeeId());
		    		 Attendance attendance=new Attendance();
		    		 attendance.setAttendanceDate(dates.getLeaveDate());
		    		 attendance.setEmployeeId(leaveObject.getEmployeeId());
		    		 attendance.setStartTime(dates.getLeaveDate());
		    		 attendance.setEndTime(dates.getLeaveDate());
		    		 attendance.setWorkingHours(0);
		    		 attendance.setDayIndicator(EmsConditions.EMPLOYEE_LEAVE_STATUS);
		    		 
		    		 attendanceDAO.inTime(attendance);
		    		 
		    	 }
		    	 employeeLeaveDao.updateLeaveStatus(employeeLeaveId, EmsConditions.EMPLOYEE_LEAVE_APPROVED);
		    }
		    else {
		    	employeeLeaveDao.updateLeaveStatus(employeeLeaveId, EmsConditions.EMPLOYEE_LEAVE_DIS_APPROVED);
		    	for(EmployeeLeaveDates dates: setOfDates){
		    		 logger.info("leave dates applied:  "+ dates.getLeaveDate());
		    		 int res=attendanceDAO.deleteAttendanceByEmployeeIdAndDate(leaveObject.getEmployeeId(), dates.getLeaveDate());
		    		 logger.info("delete for employee id: "+leaveObject.getEmployeeId()+"  on date: "+dates.getLeaveDate()+"  result:"+res);
		    	 }
		    	
			}
			
		    return 1;
		    
		}
		
		/**
		 * This method is to return employee leave deatils for given employee id and for given month
		 * @param employeeId employee id for searching
		 * @param month month in string format contains month and year  example: 2016-03
		 * @return employee leave details in JSON string type
		 */
		@Transactional(rollbackFor=HibernateException.class,readOnly=true)
		public String verifyEmployeeLeaveStatus(int employeeId, String month) {
			String [] array=month.split("-");
			Calendar cal=Calendar.getInstance();			
			cal.set(Integer.parseInt(array[0]), Integer.parseInt(array[1])-1, cal.getActualMinimum(Calendar.DAY_OF_MONTH));
			Date monthStartDate=cal.getTime();
			cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
			Date monthEndDate=cal.getTime();
			logger.info("employee leave status  start date: "+monthStartDate +"  end date: "+monthEndDate);
			List<EmployeeLeave> list=employeeLeaveDao.getEmployeeLeaveDetails(employeeId, monthStartDate, monthEndDate);
			logger.info("employee leave details list size: "+list.size());
			return JsonUtility.convertToJson(list);
		}
		
		

}
