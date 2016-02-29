package com.caprusit.ems.dao;


import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.User;

@Repository
public class AttendanceDAOImpl implements IAttendanceDAO {
	
	private Logger logger= Logger.getLogger(AttendanceDAOImpl .class);
	
	/**
	 * This method saves Attendance class object into database
	 * */
	public int inTime(Attendance attendance) {
		HibernateSessionUtility.getHibernateSession().save(attendance);
		return 1;
	}
	
	/**
	 * This method updates out time and working hours of employee into database
	 * */
	public int outTime(User user) {
		Session session=HibernateSessionUtility.getHibernateSession();
		Query updateEndTime = session.createQuery(
				"update Attendance set endTime = :endtime where attendanceDate = :attendancedate and employeeId = :empId");
		updateEndTime.setParameter("endtime", new Date());
		updateEndTime.setParameter("attendancedate", getTodayDate());
		updateEndTime.setParameter("empId", user.getEid());

		Query updateWorkingHours = session.createQuery(
				"update Attendance a set a.workingHours=(select (b.endTime - b.startTime)*24 from Attendance b where b.attendanceDate = ? and b.employeeId = ?) where a.attendanceDate = ? and a.employeeId = ?");
		updateWorkingHours.setParameter(0, getTodayDate());
		updateWorkingHours.setParameter(1, user.getEid());
		updateWorkingHours.setParameter(2, getTodayDate());
		updateWorkingHours.setParameter(3, user.getEid());



		int res = updateEndTime.executeUpdate();
		int res2 = updateWorkingHours.executeUpdate();


		logger.info("operation upate end time: " + res);
		logger.info("hors worked: " + res2);
		return res + res2;
	}
	/**
	 * This method is to find out employees who are not logged out
	 * after they completed their work hours
	 */
    public List<Integer> getStillWorkingEmployeeIds() {

		Date today = Calendar.getInstance().getTime();

		@SuppressWarnings("unchecked")
		List<Integer> list = HibernateSessionUtility.getHibernateSession()
				.createCriteria(Attendance.class)
				.add(Restrictions.eq("attendanceDate", today))
				.add(Restrictions.eqOrIsNull("endTime", null))
				.add(Restrictions.le("startTime", getMinStartTime()))
				.setProjection(
						Projections.projectionList()
								.add(Projections.property("employeeId"))).list();

		return list;
	}

	/**
	 * This method is to set today date with 00:00:00 time
	 * 
	 */
	private Date getMinStartTime() {

		Calendar cal = Calendar.getInstance();
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minutes = cal.get(Calendar.MINUTE);
		cal.set(Calendar.HOUR_OF_DAY, (hour - EmsConditions.WORKING_HOURS_PER_DAY));
		cal.set(Calendar.MINUTE, minutes);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);

		logger.info("min login time   :    "+cal.getTime());
		return cal.getTime();

	}

	/**
	 * This method is to set today date with 00:00:00 time
	 * 
	 */
	private Date getTodayDate() {

		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);

		return cal.getTime();

	}

	
}
