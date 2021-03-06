package com.caprusit.ems.config;

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
@ComponentScan(basePackages = "com.caprusit.ems")
public class ChildConfigBean extends WebMvcConfigurerAdapter {

  /**
   * For view Resourcebundle resolver.
   * @return {@link ResourceBundleViewResolver}
   */
  @Bean
  public ResourceBundleViewResolver resourceBundleViewResolver() {
    ResourceBundleViewResolver resolver = new ResourceBundleViewResolver();
    resolver.setOrder(1);
    resolver.setBasename("properties/excelView");

    return resolver;
  }

  /**
   * Bean for view normal resolver.
   * @return {@link ViewResolver}
   */
  @Bean
  public ViewResolver configureViewResolver() {
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
   * This methos is to add interceptors to application.
   */
  @Override
  public void addInterceptors(InterceptorRegistry registry) {

    LoggerInterceptor loggerInterceptor = new LoggerInterceptor();

    registry.addInterceptor(loggerInterceptor).addPathPatterns("/*");

  }

}
