package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Employee;

@Repository
public class ManageUserDAOImpl implements IManageUserDAO{
	
	
	@Autowired
	private SessionFactory sessionFactory;

	private Logger logger=Logger.getLogger(ManageUserDAOImpl.class);

	public List<Object> getEmployees() {
		

		logger.info("inside ManageUserDAOImpl getEmployees()");
		Session session = sessionFactory.openSession();
		
		/*String sql="select e.employeeid,e.firstname,e.lastname,e.dob,e.mobileno,e.emailid,e.designation,r.roletype,e.status,d.deptname"
				+ " from employee_table e ,role_table r,department_table d"
				+ "where e.roleid=r.roleid and e.deptid=d.deptid";*/
		
		
		String sql = "SELECT * FROM EMPLOYEE_TABLE";
		SQLQuery query = session.createSQLQuery(sql);
		query.addEntity(Employee.class);
		
		@SuppressWarnings("unchecked")
		List<Object> results = query.list();
		
		
		
		session.close();
		return results;
	}
}


