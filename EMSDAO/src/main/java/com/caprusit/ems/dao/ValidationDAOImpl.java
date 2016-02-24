package com.caprusit.ems.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Department;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.Role;

@Repository
public class ValidationDAOImpl implements ValidationDAO {

	@Autowired
	private SessionFactory sessionFactory;

	private Logger logger=Logger.getLogger(ValidationDAOImpl.class);
	
	/**
	 * This method returns all employee ids along with first name and last name
	 */
	@SuppressWarnings("unchecked")
	public List<Object> getAllEmploeeIds() {
		
		logger.info("inside ValidationDAOImpl getAllEmploeeIds()");

		Session session = sessionFactory.openSession();

		Criteria allEmployeeIdsCriteria = session.createCriteria(Employee.class);

		allEmployeeIdsCriteria.add(Restrictions.eq("status", "1"));
		Projection allEmployeeIdsProjection1 = Projections.property("employeeId");
		Projection allEmployeeIdsProjection2 = Projections.property("firstName");
		Projection allEmployeeIdsProjection3 = Projections.property("lastName");

		ProjectionList validationProjectionList = Projections.projectionList();
		validationProjectionList.add(allEmployeeIdsProjection1);
		validationProjectionList.add(allEmployeeIdsProjection2);
		validationProjectionList.add(allEmployeeIdsProjection3);

		allEmployeeIdsCriteria.setProjection(validationProjectionList);

		List<Object> allEmpData = allEmployeeIdsCriteria.list();
		
		logger.info("inside ValidationDAOImpl getAllEmploeeIds(): all emploee ids size: "+allEmpData.size());

		session.close();

		return allEmpData;

	}

	/**
	 * This method returns employee ids who are logged-in into application
	 */
	public List<Object> getLoggedInEmployeeIds() {
		
		logger.info("inside ValidationDAOImpl getLoggedInEmployeeIds()");

		/*to get logged-in employee IDs we have to pass 2 */
		return executeCriteria(2);
		

	}

	/**
	 * This method returns employee ids who are logged-out from application
	 */
	public List<Object> getLoggedOutEmoloyeeIds() {
		
		logger.info("inside ValidationDAOImpl getLoggedOutEmoloyeeIds()");
		/*to get logged-out emploee IDs we have to pass 1 */
		
		return executeCriteria(1);
	}
	
	private Date getTodayDate(){
		
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);

		return cal.getTime();
				
	}
	
	
	@SuppressWarnings("unchecked")
	private List<Object> executeCriteria(int type){
		
		Session session = sessionFactory.openSession();

		Criteria employeeIdsCriteria = session.createCriteria(Attendance.class);

		Projection employeeIdsProjection = Projections.property("employeeId");

		Date today= getTodayDate();
		
		Criterion criterion_toady = Restrictions.eq("attendanceDate", today);
		double workingHours=0;
		Criterion criterion_workingHours = (type == 1) ? Restrictions.gt("workingHours",workingHours): Restrictions.eq("workingHours",workingHours);
		
		Criterion conditon=Restrictions.and(criterion_toady,criterion_workingHours);
		ProjectionList employeeIdsProjectionList = Projections.projectionList();
		employeeIdsProjectionList.add(employeeIdsProjection);

		employeeIdsCriteria.setProjection(employeeIdsProjectionList);
		employeeIdsCriteria.add(conditon);

		List<Object> loggedInList = employeeIdsCriteria.list();
		
		session.close();

		return loggedInList;
		
	}

	/**
	 * This method returns all role ids and role name
	 */
	
	@SuppressWarnings("unchecked")
	public List<Object> getRoleIds() {
		
		Session session = sessionFactory.openSession();
		
		Criteria roleIdCriteria=session.createCriteria(Role.class);
		
		List<Object> roleIdList=roleIdCriteria.list();
		
		logger.info("role IDs list in dao : "+roleIdList);

		session.close();
		
		return roleIdList;
	}


	/**
	 * This method returns all department ids and department names
	 */
	@SuppressWarnings("unchecked")
	public List<Object> getDeptIds() {
		
        Session session = sessionFactory.openSession();
		
		Criteria deptIdCriteria=session.createCriteria(Department.class);
		
		List<Object> deptIdList=deptIdCriteria.list();
		
		logger.info("dept IDs list in dao : "+deptIdList);

		session.close();
		
		return deptIdList;
	}
}
