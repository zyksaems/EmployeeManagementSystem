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
	private List<Object> result=null;
	private Logger logger=Logger.getLogger(ReportGenerationDAOImpl.class);
	
	/*@SuppressWarnings("unchecked")
	public List<Object> getEmployeeReport(int employeeId,int attendanceId) {
		double workingHours=0.0;
	   
		logger.info("Inside ReportGenerationDAOImpl  getEmployeeReport() method");
		
		String verifyEmployeeId="select employeeId,firstName,lastName from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
		
		//Open a session
		String hql="select workingHours from com.caprusit.ems.domain.Attendance where employeeId=:employeeId and attendanceId=:attendanceId";
		Session session = sessionFactory.openSession();
		//open a transaction
		Transaction tx=session.beginTransaction();
		try{
			//Create a query object
			Query query= session.createQuery(verifyEmployeeId);
			logger.info("VerifyEmployeeId:"+verifyEmployeeId);
			// Set query parameters
			query.setParameter("employeeId", employeeId);
			// execute the query
			result =query.list();
			int count=result.size();
			logger.info("Result in DAO:"+result);
				if(count>0){
				// create a query object
				query= session.createQuery(hql);
				logger.info("HQl query:"+hql);
				//set a query parameters
				query.setParameter("employeeId", employeeId);
				query.setParameter("attendanceId",attendanceId);
				//execute the query
				workingHours=(Double)query.uniqueResult();
				logger.info("Working hours:"+workingHours);
				if(workingHours>0.0)
				{
					tx.commit();
					result.add(workingHours);
					logger.info("result DATA:"+result);
				}
			}
		}catch(Exception e){
			logger.error("Error Occurred while getEmployeeReport() method"+e);
			tx.rollback();
		}
		logger.info("Result size:"+result.size());
		logger.info("result data:"+result);
		session.close();
		return result;
	}
*/
	/*@SuppressWarnings("unchecked")
	public List<Object> getEmployeeReport(int employeeId, Date attendanceDate) {
		double workingHours=0.0;
		   
		logger.info("Inside ReportGenerationDAOImpl  getEmployeeReport() method");
		
		String verifyEmployeeId="select employeeId,firstName,lastName from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
		
		//Open a session
		String hql="select workingHours from com.caprusit.ems.domain.Attendance where employeeId=:employeeId and attendanceDate=:attendanceDate";
		Session session = sessionFactory.openSession();
		//open a transaction
		Transaction tx=session.beginTransaction();
		try{
			//Create a query object
			Query query= session.createQuery(verifyEmployeeId);
			logger.info("VerifyEmployeeId:"+verifyEmployeeId);
			// Set query parameters
			query.setParameter("employeeId", employeeId);
			// execute the query
			result =query.list();
			int count=result.size();
			logger.info("Result in DAO:"+result);
				if(count>0){
				// create a query object
				query= session.createQuery(hql);
				logger.info("HQl query:"+hql);
				//set a query parameters
				query.setParameter("employeeId", employeeId);
				query.setParameter("attendanceDate",attendanceDate);
				//execute the query
				workingHours=(Double)query.uniqueResult();
				logger.info("Working hours:"+workingHours);
				if(workingHours>0.0)
				{
					tx.commit();
					result.add(workingHours);
					logger.info("result DATA:"+result);
				}
			}
		}catch(Exception e){
			result.add("Not done any work at this day.....");
			logger.error("Error Occurred while getEmployeeReport() method"+e);
			tx.rollback();
		}
		logger.info("Result size:"+result.size());
		logger.info("result data:"+result);
		session.close();
		return result;
	}*/


	@SuppressWarnings("unchecked")
	public List<Object> getEmployeeReport(int employeeId, Date attendanceDate) {
		/*Date startTime=null;
		   
		logger.info("Inside ReportGenerationDAOImpl  getEmployeeReport() method");
		
		String verifyEmployeeId="select employeeId,firstName,lastName from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
		
		//Open a session
		String hql="select startTime from com.caprusit.ems.domain.Attendance where employeeId=:employeeId and attendanceDate=:attendanceDate";
		Session session = sessionFactory.openSession();
		//open a transaction
		Transaction tx=session.beginTransaction();
		try{
			//Create a query object
			Query query= session.createQuery(verifyEmployeeId);
			logger.info("VerifyEmployeeId:"+verifyEmployeeId);
			// Set query parameters
			query.setParameter("employeeId", employeeId);
			// execute the query
			result =query.list();
			int count=result.size();
			logger.info("Result in DAO:"+result);
				if(count>0){
				// create a query object
				query= session.createQuery(hql);
				logger.info("HQl query:"+hql);
				//set a query parameters
				query.setParameter("employeeId", employeeId);
				query.setParameter("attendanceDate",attendanceDate);
				//execute the query
				startTime=(Date)query.uniqueResult();
			
				if(startTime!=null)
				{
				//code to separate time from date 
			       SimpleDateFormat sdf = new SimpleDateFormat( "hh:mm:ss" );
			       
			       String startTime1 = sdf.format(startTime);

				//code to separate date from time
				SimpleDateFormat sdf = new SimpleDateFormat( "dd-MM-yyyy" );
			       
			       String startTime1 = sdf.format(startTime);
				
				
				logger.info("startTime:"+startTime1);
			
					tx.commit();
					result.add(startTime1);
					logger.info("result DATA:"+result);
				}
				else
				{
					result.add("Not done any work at this day.....");
				}
			}
		}catch(Exception e){
			logger.error("Error Occurred while getEmployeeReport() method"+e);
			tx.rollback();
		}
		logger.info("Result size:"+result.size());
		logger.info("result data:"+result);
		session.close();
		return result;*/
		
		 Session session=sessionFactory.openSession();
		    Criteria crit=session.createCriteria(Attendance.class);
		    Criterion c1=Restrictions.eq("employeeId",employeeId);
		    Criterion c2=Restrictions.eq("attendanceDate",attendanceDate);
		    Criterion c3=Restrictions.and(c1,c2);
		    crit.add(c3);
		    result=crit.list();
		    logger.info("List Size:"+result.size());
		   if(result.size()>0 && result!=null){
			return result;
			}	
		   else{
			   result.add("No record Found during given period");
		    }
			return result;
		}
	

	@SuppressWarnings("unchecked")
	public List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
	//	List<Object> list=null;
    Session session=sessionFactory.openSession();
    Criteria crit=session.createCriteria(Attendance.class);
    Criterion c1=Restrictions.eq("employeeId",employeeId);
    Criterion c2=Restrictions.between("attendanceDate",fromDate,toDate);
    Criterion c3=Restrictions.and(c1,c2);
    crit.add(c3);
    result=crit.list();
    logger.info("List Size:"+result.size());
   if(result.size()>0 && result!=null){
	return result;
	}	
   else{
	   result.add("No record Found during given period");
    }
	return result;
}
	
@SuppressWarnings("unchecked")
public List<Object> getEmployees( int employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployees()");
		Session session = sessionFactory.openSession();
		
		/*
		String hql="from Attendance a";
		
		Query query=session.createQuery(hql);
		
		List<Object> results = query.list();
		
		session.close();
		return results;*/
	
		/*String hql="select employeeId,firstName,lastName,designation from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
		
		//Create a query object
		Query query= session.createQuery(hql);
		logger.info("VerifyEmployeeId:"+hql);
		// Set query parameters
		query.setParameter("employeeId", employeeId);
		// execute the query
		List <Object> empData =query.list();
		*/
		
		    Criteria crit=session.createCriteria(Attendance.class);
		    Criterion c1=Restrictions.eq("employeeId",employeeId);
		    crit.add(c1);
		    result=crit.list();
		    logger.info("List Size:"+result.size());
		   if(result.size()>0 && result!=null){
			return result;
			}	
		   else{
			   result.add("No record Found on given Date");
		    }
			return result;
	}


@SuppressWarnings("unchecked")
public List<Object> getAllEmployees() {
	logger.info("inside ReportGenerationServiceImpl getAllEmployees()");
	Session session = sessionFactory.openSession();
	
	String hql="from Attendance a";
	
	Query query=session.createQuery(hql);
	
	List<Object> results = query.list();
	
	session.close();
	return results;
}


public List<Object> login(int employeeId) {
	
	String hql="select firstName,lastName,designation from com.caprusit.ems.domain.Employee where employeeId=:employeeId";
	
	Session session = sessionFactory.openSession();
	
	//Create a query object
	Query query= session.createQuery(hql);
	logger.info("EmpData Query:"+hql);
	// Set query parameters
	query.setParameter("employeeId", employeeId);
	// execute the query
	@SuppressWarnings("unchecked")
	List <Object> empData =query.list();
	return empData;
}

}