package com.caprusit.ems.dao;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Attendance;

@Repository
public class EmployeeLeaveDAOImpl implements IEmployeeLeaveDAO{

	@Autowired
	private SessionFactory factory;
	
	private Logger logger= Logger.getLogger(AttendanceDAOImpl .class);
	
	public List<Long> getEmployeeLeaveCount(int employeeId) {
		logger.info("inside EmployeeLeaveDAOOmpl  getEmployeeLeaveCount()");
		Session session = factory.openSession();
		
		List<Long> leavelist=new ArrayList<Long>();
		try{
		Criteria crit = session.createCriteria(Attendance.class);
		
		crit.add( Restrictions.eq("employeeId",employeeId));
		crit.add( Restrictions.ne("dayIndicator", 1));
		crit.setProjection(Projections.rowCount());
		Long count = (Long) crit.uniqueResult();
		System.out.println("total nonworked days  :" +count);
		
		
        Criteria crit1 = session.createCriteria(Attendance.class);
		
		crit1.add( Restrictions.eq("employeeId",employeeId));
		crit1.add( Restrictions.eq("dayIndicator", 2));
		crit1.setProjection(Projections.rowCount());
		Long absent = (Long) crit1.uniqueResult();
		System.out.println("absent days  :" +absent);
		
		Long leave=count-absent;
		
		leavelist.add(0,count);
		leavelist.add(1,absent);
		leavelist.add(2,leave);
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		/*SQLQuery qry=session.createSQLQuery("select count(*) from PRAKASH.ATTENDANCE_TABLE where employeeid=:P AND DAYINDICATOR !=1");	
		//qry.addScalar("count",IntegerType.INSTANCE);
	      qry.setInteger("P", adminId);
		List list =qry.list();*/
		
	/*	int res=(Integer)list.get(0);*/
		System.out.println(leavelist);
		
		return leavelist;
	}

	public List<Object> getLeaveDates(int employeeId) {
		
		Session session = factory.openSession();
		SQLQuery qry=session.createSQLQuery("select  a.ATTENDANCEDATE,d.DAYNAME from PRAKASH.ATTENDANCE_TABLE a INNER JOIN PRAKASH.DAYTYPE_TABLE d on a.DAYINDICATOR=d.DAYINDICATOR where a.employeeid="+employeeId+" AND  a.DAYINDICATOR !=1 order by a.ATTENDANCEDATE asc");	
		//qry.addScalar("count",IntegerType.INSTANCE);
	//      qry.setInteger("P", adminId);
		
		List<Object> list =qry.list();
		
		return list;
	}

	public List<Object> getMonthLeaveDates(int employeeId,String month) {
		
		
		String monthdate[]=month.split("-");
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
	     
	     Date dateOfMonth2= calendar.getTime();
	    		 
	     System.out.println(dateOfMonth2);
	     
		Session session = factory.openSession();
		SQLQuery qry=session.createSQLQuery("select  a.ATTENDANCEDATE,d.DAYNAME from PRAKASH.ATTENDANCE_TABLE a INNER JOIN PRAKASH.DAYTYPE_TABLE d on a.DAYINDICATOR=d.DAYINDICATOR where a.employeeid="+employeeId+" AND  a.DAYINDICATOR !=1 AND (a.ATTENDANCEDATE >=:startDate  AND a.ATTENDANCEDATE <=:endDate )");                                 
		 qry.setDate("startDate",dateOfMonth1);
		 qry.setDate("endDate",dateOfMonth2);
		 
		List<Object> list =qry.list();
		return list;
	}

}
