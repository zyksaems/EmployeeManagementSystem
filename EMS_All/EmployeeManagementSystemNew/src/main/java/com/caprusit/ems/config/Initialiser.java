package com.caprusit.ems.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Initialiser implements WebApplicationInitializer {

  @Override
  public void onStartup(ServletContext servletContext) {
    // Create the dispatcher servlet's Spring application context(parent container)
    AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
    // dispatcherContext.register(ParentConfigBean.class);

    // Create the 'root' Spring application context(child container)
    AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
    rootContext.register(ChildConfigBean.class);
    rootContext.setServletContext(servletContext);

    // Manage the lifecycle of the root application context
    servletContext.addListener(new ContextLoaderListener(rootContext));

    // Register and map the dispatcher servlet
    ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher",
        new DispatcherServlet(dispatcherContext));
    dispatcher.setLoadOnStartup(1);
    dispatcher.addMapping("*.do");
    servletContext.addListener(new SessionListener());
  }

}
