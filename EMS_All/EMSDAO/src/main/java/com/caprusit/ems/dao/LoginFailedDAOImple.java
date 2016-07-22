package com.caprusit.ems.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.EncryptedEmployee;

@Repository
public class LoginFailedDAOImple implements LoginFailedAttemptsDAO {

  private Logger logger = Logger.getLogger(LoginFailedDAOImple.class);

  public int checkAttemptsCount(int adminId) {
    logger.info("in side checkLoginAttempts Methode() DAOImpl");

    SQLQuery qry = HibernateSessionUtility.getHibernateSession().createSQLQuery(
        "select attemptcount from PRAKASH.employeePassword_table where employeeid=" + adminId);
    qry.addScalar("attemptcount", IntegerType.INSTANCE);

    List<Integer> list = qry.list();

    int res = (Integer) list.get(0);

    logger.info("identity ====================" + res);
    return res;
  }

  public void incrementAttemptCount(int adminId) {
    logger.info("in side incrementAttemptCount Methode() DAOImpl");

    SQLQuery qry = HibernateSessionUtility.getHibernateSession().createSQLQuery(
        "update PRAKASH.employeePassword_table set attemptcount=attemptcount+1 where employeeid="
            + adminId);
    qry.executeUpdate();
  }

  public int LockUser(int adminId) {
    logger.info("in side LockUser Methode() DAOImpl");

    SQLQuery qry = HibernateSessionUtility.getHibernateSession().createSQLQuery(
        "update PRAKASH.employeePassword_table set locked=1 where employeeid=" + adminId);
    int res = qry.executeUpdate();
    logger.info("locked      =======================" + res);
    return res;
  }

  public int setDefualtAttemptCount(int adminId) {

    SQLQuery qry = HibernateSessionUtility.getHibernateSession().createSQLQuery(
        "update PRAKASH.employeePassword_table set attemptcount=0 where employeeid=" + adminId);
    int res = qry.executeUpdate();
    logger.info("defaultAttemptCount    =======================" + res);
    return res;
  }

  public String[] getMailID(int adminId) {

    SQLQuery qry = HibernateSessionUtility.getHibernateSession().createSQLQuery(
        "select firstname,lastname,emailid from prakash.employee_table where employeeid="
            + adminId);
    qry.addScalar("firstname", StringType.INSTANCE);
    qry.addScalar("lastname", StringType.INSTANCE);
    qry.addScalar("emailid", StringType.INSTANCE);

    List<Object> list = qry.list();
    Object[] obj = (Object[]) list.get(0);

    String res[] = new String[3];
    res[0] = (String) obj[0];
    res[1] = (String) obj[1];
    res[2] = (String) obj[2];

    logger.info("mail ====================" + res);

    return res;
  }

  @Override
  public int isEmployeeBlocked(int employeeId) {

    return (int) HibernateSessionUtility.getHibernateSession()
        .createCriteria(EncryptedEmployee.class).add(Restrictions.eq("employeeId", employeeId))
        .setProjection(Projections.property("locked")).list().get(0);
  }

}
