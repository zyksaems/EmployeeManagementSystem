package com.caprusit.ems.dao;

import java.util.List;



import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.caprusit.ems.domain.Employee;

@Repository
public class ManageUserDAOImpl implements IManageUserDAO{
	
	
	@Autowired
	private SessionFactory sessionFactory;

	private Logger logger=Logger.getLogger(ManageUserDAOImpl.class);
	

	/**
	 * This method reads all employee details
	 * Returns as List of Employee
	 */
	public List<Employee> getEmployees() {
		logger.info("inside ManageUserDAOImpl getEmployees()");
		Session session = sessionFactory.openSession();
		Criteria allEmployeeCriteria=session.createCriteria(Employee.class);
		List<Employee> results = allEmployeeCriteria.list();		
		session.close();
		return results;
	}
	
	public Employee findById(int id) {
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		Employee result = null;
		try {
			String hql = "From Employee u where u.employeeId=:id";
			Query query = session.createQuery(hql);
			query.setParameter("id", id);
			System.out.println("Searching id= " + id);
			List<Employee> results = query.list();
			result = results.get(0);
			System.out.println("Object of id =" + result);
			tx.commit();
		} catch (Exception e) {
			tx.commit();
			e.printStackTrace();
		}
		session.close();
		return result;
	}
	
	/**
	 * This method is to save employee object into database
	 */
	public int saveEmployee(Employee emp) throws HibernateException {

		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		session.saveOrUpdate(emp);
		ts.commit();
		session.close();
		return 1;

	}
	/**
	 * This method updates employee details in database
	 */
    public int updateEmployee(Employee emp){		
		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		session.update(emp);
		ts.commit();
		session.close();
		return 1;
	}
    
    
    public List<Employee> getAllEmployeesData() {
		Session session = sessionFactory.openSession();
		String sql = "SELECT * FROM PRAKASH.EMPLOYEE_TABLE";
		SQLQuery query = session.createSQLQuery(sql);
		query.addEntity(Employee.class);
		@SuppressWarnings("unchecked")
		List<Employee> results = query.list();		
		session.close();
		return results;
	}
	
	public Integer updateEmployeeData(Employee e){
		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		session.update(e);
		ts.commit();
		session.close();
		return 1;
		

	}
	

	
	
}


