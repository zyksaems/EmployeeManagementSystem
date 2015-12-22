package com.caprusit.ems.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Employee;

@Repository
public class ReportGenerationDAOImpl implements IReportGenerationDAO {

	@Autowired
	private SessionFactory sessionFactory;
	private List<Object> result = null;
	private Logger logger = Logger.getLogger(ReportGenerationDAOImpl.class);
	
	@SuppressWarnings("unchecked")
	public List<Integer> getAutoCompleteInfo(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getAutoCompleteInfo()");
		
		Session session = sessionFactory.openSession();
		
		SQLQuery query = session.createSQLQuery("select employeeid from employee_table where employeeid like '"+employeeId+"%'");
		List<Integer> pusList = query.list();
		logger.info("info list in dao: "+pusList);
		
		return pusList;
	}

	@SuppressWarnings("unchecked")
	public List<String> getAutoCompleteInfo(String employeeId) {
	logger.info("inside ReportGenerationDAOImpl getAutoCompleteInfo()");

		Session session = sessionFactory.openSession();
		SQLQuery query = session.createSQLQuery("select firstname,lastname from employee_table where firstname like '"+employeeId+"%'");
		List<String>pusList = query.list();
		return pusList;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeeReport(int employeeId, Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getEmployeeReport()");
		Session session = sessionFactory.openSession();
		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.eq("attendanceDate", attendanceDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);
		List<Attendance> result = crit.list();
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getAllEmployeeReport()");
		Session session = sessionFactory.openSession();
		
		Criteria crit = session.createCriteria(Attendance.class);

		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.between("attendanceDate", fromDate, toDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);

		List<Attendance> result = crit.list();
		logger.info("Result size:"+result.size());

		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployees(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getEmployees()");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		crit.add(c1);
		List<Attendance>result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getAllEmployees() {
		logger.info("inside ReportGenerationDAOImpl getAllEmployees()");
		Session session = sessionFactory.openSession();

		String hql = "from Attendance a";

		Query query = session.createQuery(hql);

		List<Attendance> result = query.list();

		session.close();
		return result;
	}

	public List<Object> login(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl login()");
		String hql = "select firstName,lastName,designation from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
		Session session = sessionFactory.openSession();

		// Create a query object
		Query query = session.createQuery(hql);
		
		logger.info("EmpData Query:" + hql);
		// Set query parameters
		query.setParameter("employeeId", employeeId);
		// execute the query
		@SuppressWarnings("unchecked")
		List<Object> empData = query.list();
		return empData;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getAllEmployeesReport(Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getAllEmployeesReport()");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("attendanceDate", attendanceDate);
		crit.add(c1);

		List<Attendance> result= crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeesReport(Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getEmployeesReport()");
		Session session = sessionFactory.openSession();
		Criteria crit = session.createCriteria(Attendance.class);

		Criterion c1 = Restrictions.between("attendanceDate", fromDate, toDate);
		crit.add(c1);

		List<Attendance> result = crit.list();
		return result;
	}

	public List<Object> login(String firstName, String lastName) {
		logger.info("inside ReportGenerationDAOImpl login()");
		String hql = "select employeeId,designation from com.caprusit.ems.domain.Employee where firstName=:firstName and lastName=:lastName";
		Session session = sessionFactory.openSession();
		// Create a query object
		Query query = session.createQuery(hql);
		logger.info("EmpData Query:" + hql);
		// Set query parameters
		query.setParameter("firstName", firstName);
		query.setParameter("lastName", lastName);
		// execute the query
		@SuppressWarnings("unchecked")
		List<Object> empData = query.list();
		return empData;
	}


	@SuppressWarnings("unchecked")
	public List<Object> getReportByName(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getReportByName(EmpId)");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		crit.add(c1);
		result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getReportByDay(int employeeId, Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getReportByDay(EmpId)");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2=Restrictions.eq("attendanceDate", attendanceDate);
		Criterion c3=Restrictions.and(c1,c2);
		crit.add(c3);
		List<Object> result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getReportByNameDates(int employeeId, Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getReportByNameDates()");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.between("attendanceDate", fromDate, toDate);
		Criterion c3=Restrictions.and(c1,c2);
		crit.add(c3);
		List<Object> result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}
	
    @SuppressWarnings("unchecked")
	public List<Attendance> getTodayAttendance() {
		
        logger.info("in ReportGenerationDAOImpl--getDailyReport()");
        
        Session session=sessionFactory.openSession();
        
        Criteria toDayReportCriteria=session.createCriteria(Attendance.class);
        
    
        Criterion dateCriterion=Restrictions.eq("attendanceDate",(Calendar.getInstance().getTime()));
        
        toDayReportCriteria.add(dateCriterion);
        
        List<Attendance> list=toDayReportCriteria.list();
        
        logger.info("list size: "+list.size());
        logger.info("list l: "+list);
        
        session.close();
        
		return list;
	}
    
    @SuppressWarnings("unchecked")
	public int getNumberOfEmployees(){
		
		 Session session=sessionFactory.openSession();
		 
		 Criteria noOfEmployeeCriteria=session.createCriteria(Employee.class);	        		    
	     
	     Projection countProjection=Projections.count("employeeId");
	     
	     noOfEmployeeCriteria.setProjection(countProjection);
	     
	     List<Object> noOfEmployeeList=noOfEmployeeCriteria.list();
	     
	     logger.info("total number of employees: "+noOfEmployeeList + "class = "+noOfEmployeeList.get(0).getClass());
	     		 
		 return ((Long)noOfEmployeeList.get(0)).intValue();
		
		
	}
    
    public Map<String,Object> getDailyReportIndividual(int employeeId, Date attendanceDate) {
        Map<String,Object> map1= new HashMap<String,Object>();  
        List<Attendance> result=null;
          
          Calendar cal = Calendar.getInstance();
          cal.setTime(attendanceDate);
          cal.add(Calendar.DATE, 6); // add 6 days

          Date toDate=cal.getTime();
          
          logger.info("Todate is:"+toDate);
           
           logger.info("inside ReportGenerationDAOImpl getDailyReportIndividual()");
           Session session = sessionFactory.openSession();

          Criteria crit = session.createCriteria(Attendance.class);
          Criterion c1 = Restrictions.eq("employeeId", employeeId);
          Criterion c2 = Restrictions.between("attendanceDate", attendanceDate, toDate);
          Criterion c3=Restrictions.and(c1,c2);
          crit.add(c3);
          result = crit.list();
          logger.info("List Size:" + result.size());
          map1.put("ListOfLine", result);
          map1.put("LastDate", toDate);
         return map1;
        }
}