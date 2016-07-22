package com.caprusit.ems.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Department;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.Role;

@Repository
public class ValidationDAOImpl implements ValidationDAO {

  private Logger logger = Logger.getLogger(ValidationDAOImpl.class);

  /**
   * This method returns all employee ids along with first name and last name
   */
  @SuppressWarnings("unchecked")
  public List<Object> getAllEmploeeIds() {

    logger.info("inside ValidationDAOImpl getAllEmploeeIds()");
    List<Object> allEmpData = HibernateSessionUtility.getHibernateSession()
        .createCriteria(Employee.class).add(Restrictions.eq("status", "1"))
        .setProjection(Projections.projectionList().add(Projections.property("employeeId"))
            .add(Projections.property("firstName")).add(Projections.property("lastName")))
        .list();

    logger.info(
        "inside ValidationDAOImpl getAllEmploeeIds(): all emploee ids size: " + allEmpData.size());

    return allEmpData;

  }

  /**
   * This method returns employee ids who are logged-in into application
   */
  public List<Object> getLoggedInEmployeeIds() {

    logger.info("inside ValidationDAOImpl getLoggedInEmployeeIds()");

    /* to get logged-in employee IDs we have to pass 2 */
    return executeCriteria(2);

  }

  /**
   * This method returns employee ids who are logged-out from application
   */
  public List<Object> getLoggedOutEmoloyeeIds() {

    logger.info("inside ValidationDAOImpl getLoggedOutEmoloyeeIds()");
    /* to get logged-out employee IDs we have to pass 1 */
    return executeCriteria(1);
  }

  private Date getTodayDate() {

    Calendar cal = Calendar.getInstance();
    cal.set(Calendar.HOUR_OF_DAY, 0);
    cal.set(Calendar.MINUTE, 0);
    cal.set(Calendar.SECOND, 0);
    cal.set(Calendar.MILLISECOND, 0);

    return cal.getTime();

  }

  @SuppressWarnings("unchecked")
  private List<Object> executeCriteria(int type) {

    return HibernateSessionUtility.getHibernateSession().createCriteria(Attendance.class)
        .add(Restrictions.and(Restrictions.eq("attendanceDate", getTodayDate()),
            (type == 1) ? Restrictions.isNotNull("endTime") : Restrictions.isNull("endTime")))
        .setProjection(Projections.property("employeeId")).list();
  }

  /**
   * This method returns all role ids and role name
   */
  @SuppressWarnings("unchecked")
  public List<Object> getRoleIds() {

    List<Object> roleIdList = HibernateSessionUtility.getHibernateSession()
        .createCriteria(Role.class).list();

    logger.info("role IDs list in dao : " + roleIdList);

    return roleIdList;
  }

  /**
   * This method returns all department ids and department names
   */
  @SuppressWarnings("unchecked")
  public List<Object> getDeptIds() {

    List<Object> deptIdList = HibernateSessionUtility.getHibernateSession()
        .createCriteria(Department.class).list();

    logger.info("dept IDs list in dao : " + deptIdList);

    return deptIdList;
  }

}
