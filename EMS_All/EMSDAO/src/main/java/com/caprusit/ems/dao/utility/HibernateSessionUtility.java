package com.caprusit.ems.dao.utility;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class HibernateSessionUtility {

  public HibernateSessionUtility(SessionFactory factory) {
    sessionFactory = factory;
  }

  private static SessionFactory sessionFactory;

  public static Session getHibernateSession() {

    return sessionFactory.getCurrentSession();
  }

}
