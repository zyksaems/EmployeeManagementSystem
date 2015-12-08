package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Attendance;

@Repository
public class ReportGenerationDAOImpl implements IReportGenerationDAO {

	@Autowired
	private SessionFactory sessionFactory;
	private List<Object> result = null;
	private Logger logger = Logger.getLogger(ReportGenerationDAOImpl.class);

	@SuppressWarnings("unchecked")
	public List<Object> getEmployeeReport(int employeeId, Date attendanceDate) {

		Session session = sessionFactory.openSession();
		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.eq("attendanceDate", attendanceDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);
		result = crit.list();
		logger.info("List Size:" + result.size());
		if (result.size() > 0 && result != null) {
			return result;
		} else {
			result.add("No record found for this particular day");
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
		// List<Object> list=null;
		Session session = sessionFactory.openSession();
		
		Criteria crit = session.createCriteria(Attendance.class);
		
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		Criterion c2 = Restrictions.between("attendanceDate", fromDate, toDate);
		Criterion c3 = Restrictions.and(c1, c2);
		crit.add(c3);
		
		result = crit.list();
		if (result.size() > 0 && result != null) {
			return result;
		} else {
			result.add("No record Found during given period");
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getEmployees(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployees()");
		Session session = sessionFactory.openSession();

		Criteria crit = session.createCriteria(Attendance.class);
		Criterion c1 = Restrictions.eq("employeeId", employeeId);
		crit.add(c1);
		result = crit.list();
		logger.info("List Size:" + result.size());
		if (result.size() > 0 && result != null) {
			return result;
		} else {
			result.add("No record Found on given Date");
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public List<Object> getAllEmployees() {
		logger.info("inside ReportGenerationServiceImpl getAllEmployees()");
		Session session = sessionFactory.openSession();

		String hql = "from Attendance a";

		Query query = session.createQuery(hql);

		 result = query.list();

		session.close();
		return result;
	}

	public List<Object> login(int employeeId) {

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

}