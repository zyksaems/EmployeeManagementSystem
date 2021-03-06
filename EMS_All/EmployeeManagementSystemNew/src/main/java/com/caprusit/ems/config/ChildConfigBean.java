package com.caprusit.ems.config;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.ResourceBundleViewResolver;

@Configuration
@EnableWebMvc
@EnableTransactionManagement
@ComponentScan(basePackages = { "com.caprusit.ems" })
public class ChildConfigBean extends WebMvcConfigurerAdapter {

  private Logger logger = Logger.getLogger(ChildConfigBean.class);

  @Bean
  public ResourceBundleViewResolver resourceBundleViewResolver() {
    logger.info("resource bundle view resolver bean is creating --  child ");
    ResourceBundleViewResolver resolver = new ResourceBundleViewResolver();
    resolver.setOrder(1);
    resolver.setBasename("properties/excelView");

    return resolver;
  }

  /**
   * Bean for view resolver.
   */
  @Bean
  public ViewResolver configureViewResolver() {
    logger.info("internal resource view resolver bean is creating --  child");
    InternalResourceViewResolver viewResolve = new InternalResourceViewResolver();
    viewResolve.setOrder(2);
    viewResolve.setPrefix("/WEB-INF/views/");
    viewResolve.setSuffix(".jsp");

    return viewResolve;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
  }

  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }

  /**
   * This method is to add interceptors to application.
   */
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // interceptor comment added
    LoggerInterceptor loggerInterceptor = new LoggerInterceptor();

    registry.addInterceptor(loggerInterceptor).addPathPatterns("/*");

  }

}
