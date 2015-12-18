package com.caprusit.ems.config;

import javax.servlet.Filter;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.caprusit.ems.config.ConfigBean;
import com.caprusit.ems.config.EmployeeFilter;
import com.caprusit.ems.config.ParentConfigBean;

public class Initialiser extends AbstractAnnotationConfigDispatcherServletInitializer {
	 
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] { ConfigBean.class,ParentConfigBean.class};
    }
  
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }
  
    @Override
    protected String[] getServletMappings() {
        return new String[] {"/"};
    }
    
    @Override
    protected Filter[] getServletFilters() {
    	Filter [] singleton = { new EmployeeFilter() };
    	return singleton;
	}
 
}
