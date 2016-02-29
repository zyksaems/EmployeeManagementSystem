package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.EncryptedEmployee;

@Repository
public class SecurityDAOImpl implements ISecurityDAO {
	
	private Logger logger = Logger.getLogger(SecurityDAOImpl.class);

	/**
	 * This method is to get admin details like first name and last name
	 * and reads current admin password
	 */
	@SuppressWarnings("unchecked")
	public List<Object> forgotPassword(int adminId) {

		List<Object> mailIdList = null;
		String verifyEmailId = "select firstName,emailId,lastName from com.caprusit.ems.domain.Employee where employeeId=:adminId";
		try {
			// Create a Query object
			Query query = HibernateSessionUtility.getHibernateSession().createQuery(verifyEmailId);
			// Set query parameters
			query.setParameter("adminId", adminId);
			// execute the query
			mailIdList = query.list();
		
		} catch (Exception e) {
			logger.error("Exception Occured while forgot Password " + e);
			
		}
		return mailIdList;
	}
	
	/**
	 * This method takes employee id
	 * returns employee object format
	 */
	public EncryptedEmployee getEmployeeCurrentPassword(int employeeId) {

		EncryptedEmployee employee=(EncryptedEmployee) HibernateSessionUtility.getHibernateSession().get(EncryptedEmployee.class, employeeId);
		
		return employee;
	}

	/**
	 * This method is to change employee password
	 * updates old password with new password
	 */
	public int changeEmployeePassword(EncryptedEmployee encryptedEmployee) {	

		HibernateSessionUtility.getHibernateSession().update(encryptedEmployee);		
		return 1;	 
	}


}