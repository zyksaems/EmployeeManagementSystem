package com.caprusit.ems.config;

import java.util.Properties;

import javax.servlet.MultipartConfigElement;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Department;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.EncryptedAdmin;
import com.caprusit.ems.domain.EncryptedEmployee;
import com.caprusit.ems.domain.Role;
import com.caprusit.ems.utility.EmailUtility;
import com.caprusit.ems.utility.UploadExcelFileUtility;


@Configuration
public class ParentConfigBean {
	
	@Value("${driverClassName}")
	private String driverClassName;

	@Value("${url}")
	private String url;

	@Value("${userName}")    
	private String userName;

	@Value("${password}")
	private String password;
	
	/*Bean creation for getting dataSource*/
	@Bean(name = "dataSource")
	public DataSource getDataSource() {
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
		
		LocalSessionFactoryBean  factory= new LocalSessionFactoryBean ();
		factory.setDataSource(getDataSource());
		factory.setAnnotatedClasses(Employee.class,Attendance.class,EncryptedAdmin.class,Role.class,Department.class,EncryptedEmployee.class);
		Properties p=new Properties();		
	    p.load(new ClassPathResource("properties/hibernate.properties").getInputStream()); //load gives FileNotFound and IOException
		factory.setHibernateProperties(p);
		System.out.println("local session factory created"+factory);		
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
		return new UploadExcelFileUtility();
	}
	
}