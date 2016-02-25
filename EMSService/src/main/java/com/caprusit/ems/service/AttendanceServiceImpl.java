package com.caprusit.ems.service;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IAttendanceDAO;
import com.caprusit.ems.dao.ISecurityDAO;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.EmployeeAttendanceRequest;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.User;
import com.caprusit.ems.utility.ValidatePasswordUtility;

@Service
public class AttendanceServiceImpl implements IAttendanceService {
	@Autowired
	private IAttendanceDAO attendanceDAO;
	@Autowired
	private ISecurityDAO securityDao;
	
	private Logger logger=Logger.getLogger(AttendanceServiceImpl.class);
	
	/**
	 * This method is for 
	 */
	public int logInOrLogOut(EmployeeAttendanceRequest test) {
		User user = new User();
		user.setEid(test.getId());

		if (test.getType().equalsIgnoreCase("login")) {

			logger.info("login executing ");
			Attendance att =setAttendanceDetails(user.getEid());
			return attendanceDAO.inTime(att);
		} else
			return attendanceDAO.outTime(user);
	}

	public int EmployeeLogInOrLogOut(EmployeeAttendanceRequest test) {
		User user = new User();
		user.setEid(test.getId());
		
		EncryptedEmployee encryptedEmployee=securityDao.getEmployeeCurrentPassword(test.getId());
		byte [] currentPassword=(encryptedEmployee != null )?encryptedEmployee.getEncryptedPassword(): null;
		if(!ValidatePasswordUtility.validatePassword(test.getPassword(),currentPassword)){
			logger.info("returnning 0 to controller -- employeee password mismatch");
			return 0;
		}
		else if (test.getType().equalsIgnoreCase("login")) {

			logger.info("attendance login executing(service) ");

			Attendance attendance = setAttendanceDetails(user.getEid());

			return attendanceDAO.inTime(attendance);

		} else{

			logger.info("attendance logout executing(service) ");
			return attendanceDAO.outTime(user);
		}
		
	}
	/**
	 * This method sets attendance details to attendance class
	 * returns attendance class object
	 */
	private Attendance setAttendanceDetails(int employeeeId){
		
		Attendance attendance = new Attendance();
		Date date = new Date();
		attendance.setAttendanceDate(date);
		attendance.setAttendanceId(34);
		attendance.setDayIndicator(1);
		attendance.setStartTime(date);
		attendance.setWorkingHours(0);
		attendance.setEmployeeId(employeeeId);		
		return attendance;
	}
	
	

}
