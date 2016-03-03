package com.caprusit.ems.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Employee;

@Repository
public class ReportGenerationDAOImpl implements IReportGenerationDAO {

	private Logger logger = Logger.getLogger(ReportGenerationDAOImpl.class);
	
	@SuppressWarnings("unchecked")
	public List<Integer> getAutoCompleteInfo(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getAutoCompleteInfo()");
		
	
		
		String hql ="select employeeId from com.caprusit.ems.domain.Employee where employeeId like '"+employeeId+"%'";
		Query query= HibernateSessionUtility.getHibernateSession().createQuery(hql); 		  
		List<Integer> pusList = query.list();
		logger.info("info list in dao: "+pusList);
		
		return pusList;
	}

	@SuppressWarnings("unchecked")
	public List<String> getAutoCompleteInfo(String employeeId) {
	logger.info("inside ReportGenerationDAOImpl getAutoCompleteInfo()");
		
		String hql ="select firstName, lastName from com.caprusit.ems.domain.Employee where firstName like '"+employeeId+"%'";
		Query query= HibernateSessionUtility.getHibernateSession().createQuery(hql); 
		List<String>pusList = query.list();
		return pusList;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeeWorkingDetailsByIdAndDate(int employeeId, Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getEmployeeReport()");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.eq("attendanceDate", attendanceDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);
		List<Attendance> result = crit.list();
		logger.info("Result size:"+result.size());
		
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeeWorkingDetailsByDates(int employeeId, Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getAllEmployeeReport()");
		
		
		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);

		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.between("attendanceDate", fromDate, toDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);
		crit.addOrder(Order.asc("attendanceDate"));

		List<Attendance> result = crit.list();
		logger.info("Result size:"+result.size());

		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeeWorkingDetailsById(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getEmployeeWorkingDetailsById()");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		crit.add(c1);
		List<Attendance>result = crit.list();
		logger.info("List Size:" + result.size());
		
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getAllEmployeesWorkingDetails() {
		logger.info("inside ReportGenerationDAOImpl getAllEmployees()");

		String hql = "from Attendance a";

		Query query = HibernateSessionUtility.getHibernateSession().createQuery(hql);

		List<Attendance> result = query.list();

		return result;
	}

	public List<Object> getSingleEmployeeDetailsById(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl login()");
		String hql = "select employeeId,firstName,lastName,designation from com.caprusit.ems.domain.Employee where employeeId=:employeeId";

		// Create a query object
		Query query = HibernateSessionUtility.getHibernateSession().createQuery(hql);
		
		logger.info("EmpData Query:" + hql);
		// Set query parameters
		query.setParameter("employeeId", employeeId);
		// execute the query
		@SuppressWarnings("unchecked")
		List<Object> empData = query.list();
		return empData;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getAllEmployeesReportByDate(Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getAllEmployeesReportByDate(-)");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("attendanceDate", attendanceDate);
		crit.add(c1);

		List<Attendance> result= crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getEmployeesReportBetweenDates(Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getEmployeesReportBetweenDates()");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class)
				.add(Restrictions.between("attendanceDate", fromDate, toDate)).addOrder(Order.asc("attendanceDate"));       
		List<Attendance> result = crit.list();
		logger.info("Data List size:"+ result.size());
		return result;
	}

	public List<Object> getSingleEmployeeDetailsByEmpName(String firstName, String lastName) {
		logger.info("inside ReportGenerationDAOImpl login()");
		String hql = "select employeeId,firstName,lastName,designation from com.caprusit.ems.domain.Employee where firstName=:firstName and lastName=:lastName";
		// Create a query object
		Query query = HibernateSessionUtility.getHibernateSession().createQuery(hql);
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
	public List<Attendance> getReportByName(int employeeId) {
		logger.info("inside ReportGenerationDAOImpl getReportByName(EmpId)");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		crit.add(c1);
		List<Attendance> result = crit.list();
		logger.info("List Size:" + result.size());

		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getReportByDay(int employeeId, Date attendanceDate) {
		logger.info("inside ReportGenerationDAOImpl getReportByDay(EmpId)");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2=Restrictions.eq("attendanceDate", attendanceDate);
		Criterion c3=Restrictions.and(c1,c2);
		crit.add(c3);
		List<Attendance> result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Attendance> getReportByNameDates(int employeeId, Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationDAOImpl getReportByNameDates()");

		Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.between("attendanceDate", fromDate, toDate);
		Criterion c3=Restrictions.and(c1,c2);
		crit.add(c3);
		List<Attendance> result = crit.list();
		logger.info("List Size:" + result.size());
		return result;
	}
	
    @SuppressWarnings("unchecked")
	public List<Attendance> getTodayPresentAttendance() {
		
        logger.info("in ReportGenerationDAOImpl--getDailyReport()");
        
        Criteria toDayReportCriteria=HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class)
        		.add(Restrictions.and(Restrictions.eq("attendanceDate",Calendar.getInstance().getTime()),Restrictions.eq("dayIndicator", EmsConditions.EMPLOYEE_PRESENT_STATUS)));            
        /*Criterion dateCriterion=Restrictions.eq("attendanceDate",(Calendar.getInstance().getTime()));
        
        toDayReportCriteria.add(dateCriterion);*/
        
        List<Attendance> list=toDayReportCriteria.list();
        
        logger.info("list size: "+list.size());
        logger.info("list l: "+list);
        
		return list;
	}
    
    public List<Attendance> getTodayLeaveAttendance(){
    	return HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class)
		.add(Restrictions.and(Restrictions.eq("attendanceDate",Calendar.getInstance().getTime()),Restrictions.eq("dayIndicator", EmsConditions.EMPLOYEE_LEAVE_STATUS))).list();
    }
    
    @SuppressWarnings("unchecked")
	public int getNumberOfEmployees(){

		 Criteria noOfEmployeeCriteria=HibernateSessionUtility.getHibernateSession().createCriteria(Employee.class);	        		    
	     
	     Projection countProjection=Projections.count("employeeId");
	     
	     noOfEmployeeCriteria.setProjection(countProjection);
	     
	     List<Object> noOfEmployeeList=noOfEmployeeCriteria.list();
	     
	     logger.info("total number of employees: "+noOfEmployeeList + "class = "+noOfEmployeeList.get(0).getClass());
	     		 
		 return ((Long)noOfEmployeeList.get(0)).intValue();
		
		
	}
    
    @SuppressWarnings("unchecked")
	public Map<String,Object> getDailyReportOfIndividual(int employeeId, Date attendanceDate) {
        Map<String,Object> map1= new HashMap<String,Object>();  
        List<Attendance> result=null;
          
          Calendar cal = Calendar.getInstance();
          cal.setTime(attendanceDate);
          cal.add(Calendar.DATE, 6); // add 6 days

          Date toDate=cal.getTime();         
          logger.info("Todate is:"+toDate);           
          logger.info("inside ReportGenerationDAOImpl getDailyReportIndividual()");

          Criteria crit = HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class);
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

    /**
     * This method is to count number of active employees
     * @return int returns count of active employees
     */
	@Override
	public int getNumberOfActiveEmployees() {
		 List<Long> countList=HibernateSessionUtility.getHibernateSession().createCriteria(Employee.class).add(Restrictions.eq("status","1")).setProjection(Projections.rowCount()).list();	
		 return countList.get(0).intValue();
	}

}