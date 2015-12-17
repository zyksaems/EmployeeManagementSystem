package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
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

	public List<Employee> getEmployees() {
		

		logger.info("inside ManageUserDAOImpl getEmployees()");
		Session session = sessionFactory.openSession();
		
		/*String sql="select e.employeeid,e.firstname,e.lastname,e.dob,e.mobileno,e.emailid,e.designation,r.roletype,e.status,d.deptname"
				+ " from employee_table e ,role_table r,department_table d"
				+ "where e.roleid=r.roleid and e.deptid=d.deptid";*/
		
		
		String sql = "SELECT * FROM EMPLOYEE_TABLE";
		SQLQuery query = session.createSQLQuery(sql);
		query.addEntity(Employee.class);
		
		@SuppressWarnings("unchecked")
		List<Employee> results = query.list();
		
		
		
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

	public void updateUser(Employee user) {
		Session session = sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		
		try{
		String hql="update Employee  set firstName=:firstname,"
				+ "lastName=:lastname,"
				+ "dob=:dob,"
				+ "mobileNo=:mobileno,"
				+ "designation=:designation,"
				+ "rollId=:rollid,"
				+ "status=:status,"
				+ "deptId=:deptid"
				+ " where employeeId=:id";
		
		Query query=session.createQuery(hql);
		
		query.setParameter("firstname", user.getFirstName());
		query.setParameter("lastname", user.getLastName());
		query.setParameter("dob", user.getDob());
		query.setParameter("mobileno", user.getMobileNo());
		query.setParameter("designation", user.getDesignation());
		query.setParameter("rollid",user.getRollId());
		query.setParameter("status",user.getStatus());
		query.setParameter("deptid", user.getDeptId());
		query.setParameter("id",user.getEmployeeId());
		
		int result = query.executeUpdate();
		
		System.out.println("Row affected "+result);
		tx.commit();
		}catch(Exception e){
			tx.rollback();
			e.printStackTrace();
		}
		session.close();

		
	}
	
	public int saveEmployee(Employee emp) throws HibernateException {

		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		session.saveOrUpdate(emp);
		ts.commit();

		session.close();
		return 1;

	}
	
}


