package com.caprusit.ems.config;



import java.io.IOException;
import java.util.Properties;

import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.caprusit.ems.dao.IAttendanceDAO;
import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Department;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EmployeeLeave;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.Notice;
import com.caprusit.ems.domain.Role;
import com.caprusit.ems.service.scheduler.SchedulerDaoObjectsUtility;
import com.caprusit.ems.utility.EmailUtility;
import com.caprusit.ems.utility.UploadExcelFileUtility;


@Configuration
public class ParentConfigBean {
	
	private Logger logger=Logger.getLogger(ParentConfigBean.class);
	
	@Value("${driverClassName}")
	private String driverClassName;

	@Value("${url}")
	private String url;

	@Value("${userName}")    
	private String userName;

	@Value("${password}")
	private String password;
	
	@Autowired
	@Qualifier("notLogoutMailJobDetail")
	JobDetail notlogOutJobdetail;
	
	@Autowired
	@Qualifier("absentJobDetail")
	JobDetail absentJobdetail;
	
	@Autowired
	@Qualifier("absentTrigger")
	Trigger absentTrigger;
	
	@Autowired
	@Qualifier("notLogoutTrigger")
	Trigger notLogoutTrigger;
	
	/*Bean creation for getting dataSource*/
	@Bean(name = "dataSource")
	public DataSource getDataSource() {
		logger.info("data source bean is creating --  parent");
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setUrl(url);
		dataSource.setUsername(userName);
		dataSource.setPassword(password);
		return dataSource;
	}

	/*Bean creation for sessionFactory of Hibernate*/
	@Bean(name="sessionFactory")
	public LocalSessionFactoryBean getSessionFactory() throws Exception{
		logger.info("local session factory bean is creating --  parent");
		LocalSessionFactoryBean  factory= new LocalSessionFactoryBean ();
		factory.setDataSource(getDataSource());
		factory.setAnnotatedClasses(Employee.class,Attendance.class,Role.class,Department.class,EncryptedEmployee.class,Notice.class,EmployeeLeave.class);
		Properties p=new Properties();		
	    p.load(new ClassPathResource("properties/hibernate.properties").getInputStream()); //load gives FileNotFound and IOException
		factory.setHibernateProperties(p);	
		return  factory;
	}
	
	/*Bean for PropertyPlaceHolderConfigurer(for reading properties file and setting values to variables)*/
	@Bean
	public static PropertyPlaceholderConfigurer placeholderConfigurer() {
		
		PropertyPlaceholderConfigurer placeholderConfigurer = new PropertyPlaceholderConfigurer();
		Resource resource = new ClassPathResource("properties/database.properties");
		placeholderConfigurer.setLocation(resource);
		return placeholderConfigurer;

	}
	
	/*Bean for utility class (sending email to administrator for forgot password purpose)*/
	@Bean
	public EmailUtility getEmailUtility() throws Exception{
		logger.info("email utility bean is creating --  parent");
		EmailUtility emailUtility= new EmailUtility();
		emailUtility.setUsername("nichalrahul.murlidhar@caprusit.com");
		emailUtility.setMailPassword("568691843030614591877879_19");
		Properties props= new Properties();
		props.load(new ClassPathResource("properties/mail.properties").getInputStream());
		emailUtility.setProps(props);
		return emailUtility;
	}
	@Bean
	public MultipartResolver multipartResolver()
	{
		// return new StandardServletMultipartResolver();
		return new CommonsMultipartResolver();
	}
	
	@Bean
	 public MultipartConfigElement multipartConfigElement() {
	     return new MultipartConfigElement("");
	 }
	/*Bean for utility class(uploading excel file of employee details into dataBase)*/
	@Bean 
	public UploadExcelFileUtility getExcelFileUtility(){
		logger.info("upload excel file utility bean is creating --  parent");
		return new UploadExcelFileUtility();
	}
	
    //  beans for quartz scheduler
	@Bean(name="notLogoutMailJobDetail")
	public MethodInvokingJobDetailFactoryBean getmethodinvokeFactoryBeanOfNotlogedOut(){
		
		logger.info("method invoking job detail factory  bean is creating --  parent");
		
		MethodInvokingJobDetailFactoryBean bean=new MethodInvokingJobDetailFactoryBean();
		
		bean.setTargetBeanName("notLogoutMailQuartzScheduler");
		bean.setTargetMethod("runSchedulerToRemindEmployees");
		bean.setConcurrent(false);
				
		return bean;
	}
	
	@Bean(name="absentJobDetail")
	public MethodInvokingJobDetailFactoryBean getmethodinvokeFactoryBeanOfAbsent(){
		
		logger.info("method invoking job detail factory  bean is creating --  parent");
		
		MethodInvokingJobDetailFactoryBean bean=new MethodInvokingJobDetailFactoryBean();
		
		bean.setTargetBeanName("absentQuartzScheduler");
		bean.setTargetMethod("updateAbsentEmployees");
		bean.setConcurrent(false);
				
		return bean;
	}
	
	@Bean(name="notLogoutTrigger")
	public CronTriggerFactoryBean getNotLogoutCronTrigger(){
	   logger.info("cron trigger factory  bean is creating --  parent");
		
		CronTriggerFactoryBean bean=new CronTriggerFactoryBean();		
		bean.setJobDetail(notlogOutJobdetail);
		bean.setCronExpression("0 0/30 19-23 ? * MON-FRI *");// 0 0/30 19-23 ? * MON-FRI *
		
		return bean;
	}
	
	@Bean(name="absentTrigger")
	public CronTriggerFactoryBean getAbsentCronTrigger(){
	   logger.info("cron trigger factory  bean is creating --  parent");
		
		CronTriggerFactoryBean bean=new CronTriggerFactoryBean();		
		bean.setJobDetail(absentJobdetail);
		bean.setCronExpression("0 30 23 ? * MON-FRI *");// 0 30 23 ? * MON-FRI *
		
		return bean;
	}
	
	@Bean
	public SchedulerFactoryBean getSchedulerFactoryBean() throws IOException{
		
		//logger.info("scheduler factory  bean is creating --  parent");
		
	     logger.info("scheduler factory  bean is creating --  child");
	     
		 SchedulerFactoryBean bean=new SchedulerFactoryBean();
 
		 bean.setTriggers(absentTrigger,notLogoutTrigger);	 
		 return bean;
		
	}
	
	@Bean
	@Autowired
	public SchedulerDaoObjectsUtility getSchedulerDaoObjectsUtility(IAttendanceDAO attendance,IManageUserDAO manageUser,EmailUtility emaily){
		return new SchedulerDaoObjectsUtility(attendance, manageUser, emaily);
	}
	
	@Bean
	@Autowired
	public HibernateTransactionManager getHibernateTransactionManager(SessionFactory sessionFactory){
		
		HibernateTransactionManager hibernateTransactionManager=new HibernateTransactionManager();
		hibernateTransactionManager.setSessionFactory(sessionFactory);
		return hibernateTransactionManager;
	}
	
	@Bean
	@Autowired
	public HibernateSessionUtility gethibernateSessionUtility(SessionFactory factory){
		return new HibernateSessionUtility(factory);
	}
	
	
	
}