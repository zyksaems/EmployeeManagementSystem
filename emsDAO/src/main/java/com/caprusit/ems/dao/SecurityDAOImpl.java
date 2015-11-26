package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.Employee;

@Repository
public class SecurityDAOImpl implements ISecurityDAO {

	@Autowired
	private SessionFactory sessionFactory;
	Transaction tx = null;
	private Logger logger = Logger.getLogger(SecurityDAOImpl.class);

	public String login(Admin admin) {

		logger.info("in dao");

		Session session = sessionFactory.openSession();

		Criteria criteria = session.createCriteria(Admin.class);
		Criterion criterion = Restrictions.eq("adminId", admin.getAdminId());
		Projection projection = Projections.property("password");
		criteria.add(criterion);
		criteria.setProjection(projection);

		@SuppressWarnings("unchecked")
		List<String> passwordList = criteria.list();

		logger.info("admin password: " + passwordList);

		String adminPass = (passwordList.size() > 0) ? passwordList.get(0).toString() : "notValid";

		return adminPass;

	}

	@SuppressWarnings("unchecked")
	public List<Object> forgotPassword(int adminId) {
		String password = null;
		List<Object> mailIdList = null;
		String verifyEmailId = "select firstName,emailId,lastName from com.caprusit.ems.domain.Employee where employeeId=:adminId";

		String getPassword = "select password from com.caprusit.ems.domain.Admin where adminId=:adminId";
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
			// Create a Query object
			query = session.createQuery(getPassword);
			// Set query parameters
			query.setParameter("adminId", adminId);
			// execute the query
			password = (String) query.uniqueResult();
			logger.info("Password is:" + password);
			mailIdList.add(password);
		} catch (Exception e) {
			logger.error("Exception Occured while forgot Password " + e);
			tx.rollback();
		}
		return mailIdList;
	}

	public String changePassword(Admin admin) {  
		  try {
		   Session session = sessionFactory.openSession();
		   logger.info(admin.getAdminId());
		   String hql = "update com.caprusit.ems.domain.Admin as a set a.password=:pwd where a.adminId=:adminId";
		   Query query = session.createQuery(hql);
		   
		   query.setParameter("pwd", admin.getPassword());
		   query.setParameter("adminId", admin.getAdminId());

		   int count=query.executeUpdate();
		      logger.info("tx committed");
		  } catch (Exception e) {
		   logger.error(e);
		   return "password cannot be changed"; 
		  }
		  return "password has been successfully changed"; 
		  
		 }

		 public List<String> getOldPassword(Admin admin) {
		  Session session = sessionFactory.openSession();
		  logger.info("in SecurityDAOImpl  getOldPassword()  "+admin);
		  String hql = " select a.password from com.caprusit.ems.domain.Admin as a where a.adminId=:adminId";
		  Query query = session.createQuery(hql);
		  query.setParameter("adminId", admin.getAdminId());
		  @SuppressWarnings("unchecked")
		  List<String> pwd = query.list();
		  logger.info("get Old Password   :    "+pwd.get(0));
		  return pwd;
		 }

	public int saveEmployee(Employee emp) {
		try {
			Session session = sessionFactory.openSession();
			tx = session.beginTransaction();
			session.saveOrUpdate(emp);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			logger.error(e);
			return 0;
		}
		return 1;
	}
}