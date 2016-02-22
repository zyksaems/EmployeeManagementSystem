package com.caprusit.ems.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeForDate;
import com.caprusit.ems.domain.EncryptedEmployee;

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
		session.save(emp);		
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
    
    
    public List<EmployeeForDate> getAllEmployeesData() {
		Session session = sessionFactory.openSession();
		String str1="select E.employeeId,E.firstName,E.lastName,E.dob,E.mobileNo,E.emailId,E.designation,R.roleType,E.status,D.deptName  from  Employee as E , Role as R,Department as D  where R.roleId=E.rollId and D.deptId=E.deptId";
		Query qry= session.createQuery(str1);

		List<Object[]> l = qry.list();
		Iterator<Object[]> it=l.iterator();
		
		List<EmployeeForDate> list=new ArrayList<EmployeeForDate>();

		
		System.out.println("by annotation");
		
		System.out.println("=======================================================");

		while(it.hasNext())
		{
			EmployeeForDate epf=new EmployeeForDate();
			Object[] rows = (Object[])it.next();
			
				int id= (Integer) rows[0];
				String fname=(String)rows[1];
				String lname=(String)rows[2];
				Date dob=(Date)rows[3];
				String mobileno=(String)rows[4];
				String email=(String)rows[5];
				String designation=(String)rows[6];
				String roletype=(String)rows[7];
				String status=(String)rows[8];
				String deptname=(String)rows[9];
				
				epf.setEmployeeId(id);
				epf.setFirstName(fname);
				epf.setLastName(lname);
				epf.setDob(dob);
				epf.setMobileNo(mobileno);
				epf.setEmailId(email);
				epf.setDesignation(designation);
				epf.setRoleType(roletype);
				epf.setStatus(status);
				epf.setDeptName(deptname);
				
				//System.out.println(epf);
				
				list.add(epf);
			
			/*Object rows[] = (Object[])it.next();
			System.out.println(rows[0]+ "||" +rows[1]+"||"+rows[2]+"||"+rows[3]+ "||" +rows[4]+"||"+rows[5]+"||"+rows[6]+ "||" +rows[7]+"||"+rows[8]+"||"+rows[9]);*/
		}
		System.out.println("by employeeformatdate ");
		Iterator<EmployeeForDate> list2=list.iterator();
		
		while(list2.hasNext()){
			System.out.println(list2.next());
		}
				session.close();
		return list;
	}
	
	public Integer updateEmployeeData(Employee e){
		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		session.update(e);
		ts.commit();
		session.close();
		return 1;
		

	}
	
	/**
	 * This method is to save EnctyptedEmployee into database
	 * 
	 * @param encEmp EncryptedEmployee object to save into database
	 * @return returns id of saved object
	 */
	public int saveEncryptedEmployee(EncryptedEmployee encEmp){
		Session session = sessionFactory.openSession();
		Transaction ts = session.beginTransaction();
		Integer id=(Integer) session.save(encEmp);
		ts.commit();
		session.close();
		
		return id;
	}
	

	
	
}


