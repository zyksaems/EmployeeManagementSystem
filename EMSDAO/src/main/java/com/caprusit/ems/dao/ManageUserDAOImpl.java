package com.caprusit.ems.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeForDate;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.Notice;

@Repository
public class ManageUserDAOImpl implements IManageUserDAO{

	private Logger logger=Logger.getLogger(ManageUserDAOImpl.class);
	

	/**
	 * This method reads all employee details
	 * Returns as List of Employee
	 */
	public List<Employee> getEmployees() {
		logger.info("inside ManageUserDAOImpl getEmployees()");
		
		Criteria allEmployeeCriteria=HibernateSessionUtility.getHibernateSession().createCriteria(Employee.class);
		List<Employee> results = allEmployeeCriteria.list();		

		return results;
	}
	
	public Employee findById(int id) {
	
		Employee result = null;
		try {
			String hql = "From Employee u where u.employeeId=:id";
			Query query = HibernateSessionUtility.getHibernateSession().createQuery(hql);
			query.setParameter("id", id);
			logger.info("Searching id= " + id);
			List<Employee> results = query.list();
			result = results.get(0);
			logger.info("Object of id =" + result);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * This method is to save employee object into database
	 */
	public int saveEmployee(Employee emp) throws HibernateException {

		
		HibernateSessionUtility.getHibernateSession().save(emp);		
		
		return 1;

	}
	/**
	 * This method updates employee details in database
	 */
    public int updateEmployee(Employee emp){		
		
		HibernateSessionUtility.getHibernateSession().update(emp);
		
		return 1;
	}
    
    
    public List<EmployeeForDate> getAllEmployeesData() {
		
		String str1="select E.employeeId,E.firstName,E.lastName,E.dob,E.mobileNo,E.emailId,E.designation,R.roleType,E.status,D.deptName  from  Employee as E , Role as R,Department as D  where R.roleId=E.rollId and D.deptId=E.deptId";
		Query qry= HibernateSessionUtility.getHibernateSession().createQuery(str1);

		List<Object[]> l = qry.list();
		Iterator<Object[]> it=l.iterator();
		
		List<EmployeeForDate> list=new ArrayList<EmployeeForDate>();

		
		logger.info("by annotation");
		
		logger.info("=======================================================");

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
				
				//logger.info(epf);
				
				list.add(epf);
			
			/*Object rows[] = (Object[])it.next();
			logger.info(rows[0]+ "||" +rows[1]+"||"+rows[2]+"||"+rows[3]+ "||" +rows[4]+"||"+rows[5]+"||"+rows[6]+ "||" +rows[7]+"||"+rows[8]+"||"+rows[9]);*/
		}
		logger.info("by employeeformatdate ");
		Iterator<EmployeeForDate> list2=list.iterator();
		
		while(list2.hasNext()){
			logger.info(list2.next());
		}
				
		return list;
	}
	
	public Integer updateEmployeeData(Employee e){
		
		HibernateSessionUtility.getHibernateSession().update(e);
		
		return 1;
		

	}
	
	/**
	 * This method is to save EnctyptedEmployee into database
	 * 
	 * @param encEmp EncryptedEmployee object to save into database
	 * @return returns id of saved object
	 */
	public int saveEncryptedEmployee(EncryptedEmployee encEmp){
		
		Integer id=(Integer) HibernateSessionUtility.getHibernateSession().save(encEmp);		
		return id;
	}
	
	public List<Notice> getNotice(){
		
		String sql = "SELECT * FROM PRAKASH.NOTICE_TABLE order by id desc";
		SQLQuery query = HibernateSessionUtility.getHibernateSession().createSQLQuery(sql);
		query.addEntity(Notice.class);
		@SuppressWarnings("unchecked")
		List<Notice> results = query.list();	

		return results;
	}
	
	public void deleteNotice(Notice data){
		logger.info("In dao");
		logger.info(data.getNotice());
		String noticeData=data.getNotice();
		logger.info("notice data"+noticeData);

		String sql = "delete from PRAKASH.NOTICE_TABLE where notices=?";
		
		SQLQuery query = HibernateSessionUtility.getHibernateSession().createSQLQuery(sql);
		query.setString(0, noticeData);
		query.addEntity(Notice.class);
		
		query.executeUpdate();
	
	}
	public void setNotice(Notice data){
		logger.info("In dao setNotice()");
		logger.info(data.getNotice());		
	
		HibernateSessionUtility.getHibernateSession().save(data);
		
	
	}
	
	
}


