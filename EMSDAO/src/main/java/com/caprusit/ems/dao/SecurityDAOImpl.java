package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.EncryptedEmployee;

@Repository
public class SecurityDAOImpl implements ISecurityDAO {

	@Autowired
	private SessionFactory sessionFactory;
	
	Transaction tx = null;
	private Logger logger = Logger.getLogger(SecurityDAOImpl.class);



	/**
	 * This method is to get admin details like first name and last name
	 * and reads current admin password
	 */
	@SuppressWarnings("unchecked")
	public List<Object> forgotPassword(int adminId) {
		String password = null;
		List<Object> mailIdList = null;
		String verifyEmailId = "select firstName,emailId,lastName from com.caprusit.ems.domain.Employee where employeeId=:adminId";
		// Create a Session
		Session session = sessionFactory.openSession();
		// Open a transaction
		tx = session.beginTransaction();
		try {
			// Create a Query object
			Query query = session.createQuery(verifyEmailId);
			// Set query parameters
			query.setParameter("adminId", adminId);
			// execute the query
			mailIdList = query.list();
		/*	Criteria passwordCriteria=session.createCriteria(EncryptedEmployee.class);
			passwordCriteria.setProjection(Projections.property("password"));
			passwordCriteria.add(Restrictions.eq("adminId", adminId));
			
			List<Object> passwordList = passwordCriteria.list();
			logger.info("Password is:" + password);
			mailIdList.add(passwordList);*/
		} catch (Exception e) {
			logger.error("Exception Occured while forgot Password " + e);
			tx.rollback();
		}
		return mailIdList;
	}
	
	/**
	 * This method takes employee id
	 * returns employee object format
	 */
	public EncryptedEmployee getEmployeeCurrentPassword(int employeeId) {
		Session session = sessionFactory.openSession();	
		EncryptedEmployee employee=(EncryptedEmployee) session.get(EncryptedEmployee.class, employeeId);
		session.close();
		return employee;
	}

	/**
	 * This method is to change employee password
	 * updates old password with new password
	 */
	public int changeEmployeePassword(EncryptedEmployee encryptedEmployee) {
		Session session = sessionFactory.openSession();
		Transaction ts=session.beginTransaction();
		session.update(encryptedEmployee);
		ts.commit();
		return 1;	 
	}


}