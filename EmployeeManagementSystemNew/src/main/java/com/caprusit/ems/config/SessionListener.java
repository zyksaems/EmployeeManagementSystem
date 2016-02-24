package com.caprusit.ems.config;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener{

	@Override
	public void sessionCreated(HttpSessionEvent se) {
	
		 System.out.println("==== Session is created ====");
	        se.getSession().setMaxInactiveInterval(1*60);
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		
		System.out.println("==== Session is destroyed ====");
		
	}

}
