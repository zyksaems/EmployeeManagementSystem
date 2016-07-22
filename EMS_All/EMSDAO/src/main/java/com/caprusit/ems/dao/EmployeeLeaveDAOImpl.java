package com.caprusit.ems.dao;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.utility.HibernateSessionUtility;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.EmployeeLeave;

@Repository
@SuppressWarnings("unchecked")
public class EmployeeLeaveDAOImpl implements IEmployeeLeaveDAO {

  private Logger logger = Logger.getLogger(AttendanceDAOImpl.class);

  public List<Long> getEmployeeLeaveCount(int employeeId) {
    logger.info("inside EmployeeLeaveDAOOmpl  getEmployeeLeaveCount()");
    Session session = HibernateSessionUtility.getHibernateSession();

    List<Long> leavelist = new ArrayList<Long>();
    try {
      Criteria crit = session.createCriteria(Attendance.class);

      crit.add(Restrictions.eq("employeeId", employeeId));
      crit.add(Restrictions.ne("dayIndicator", 1));
      crit.setProjection(Projections.rowCount());
      Long count = (Long) crit.uniqueResult();
      System.out.println("total nonworked days  :" + count);

      Criteria crit1 = session.createCriteria(Attendance.class);

      crit1.add(Restrictions.eq("employeeId", employeeId));
      crit1.add(Restrictions.eq("dayIndicator", 2));
      crit1.setProjection(Projections.rowCount());
      Long absent = (Long) crit1.uniqueResult();
      System.out.println("absent days  :" + absent);

      Long leave = count - absent;

      leavelist.add(0, count);
      leavelist.add(1, absent);
      leavelist.add(2, leave);

    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println(leavelist);

    return leavelist;
  }

  public List<Object> getLeaveDates(int employeeId) {

    Session session = HibernateSessionUtility.getHibernateSession();
    SQLQuery qry = session.createSQLQuery(
        "select  a.ATTENDANCEDATE,d.DAYNAME from PRAKASH.ATTENDANCE_TABLE a INNER JOIN PRAKASH.DAYTYPE_TABLE d on a.DAYINDICATOR=d.DAYINDICATOR where a.employeeid="
            + employeeId + " AND  a.DAYINDICATOR !=1 order by a.ATTENDANCEDATE asc");

    List<Object> list = qry.list();

    return list;
  }

  public List<Object> getMonthLeaveDates(int employeeId, String month) {

    String monthdate[] = month.split("-");
    String month_year = monthdate[0];
    String month_monthnumber = monthdate[1];

    int month_parseyear = Integer.parseInt(month_year);
    int month_parsemonthnumber = Integer.parseInt(month_monthnumber);

    Calendar calendar = Calendar.getInstance();
    calendar.clear();
    calendar.set(Calendar.DAY_OF_MONTH, 1);
    calendar.set(Calendar.MONTH, month_parsemonthnumber - 1);
    calendar.set(Calendar.YEAR, month_parseyear);

    Date dateOfMonth1 = calendar.getTime();

    calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

    System.out.println(dateOfMonth1);
    // calendar.clear();
    // Calendar cal2=Calendar.getInstance();

    Date dateOfMonth2 = calendar.getTime();

    System.out.println(dateOfMonth2);

    Session session = HibernateSessionUtility.getHibernateSession();
    SQLQuery qry = session.createSQLQuery(
        "select  a.ATTENDANCEDATE,d.DAYNAME from PRAKASH.ATTENDANCE_TABLE a INNER JOIN PRAKASH.DAYTYPE_TABLE d on a.DAYINDICATOR=d.DAYINDICATOR where a.employeeid="
            + employeeId
            + " AND  a.DAYINDICATOR !=1 AND (a.ATTENDANCEDATE >=:startDate  AND a.ATTENDANCEDATE <=:endDate )");
    qry.setDate("startDate", dateOfMonth1);
    qry.setDate("endDate", dateOfMonth2);

    List<Object> list = qry.list();
    return list;
  }

  /**
   * This method is to save employee leave object into database
   * 
   * @param employeeLeave
   *          employee leave class object to save into database
   * @return 1 on successful save
   */
  public int applyLeave(EmployeeLeave employeeLeave) {
    logger.info("In dao applyLeave()");
    HibernateSessionUtility.getHibernateSession().save(employeeLeave);
    return 1;
  }

  public List<EmployeeLeave> getEmployeeLeaveNotification(int employeeId) {

    Criteria criteria = HibernateSessionUtility.getHibernateSession()
        .createCriteria(EmployeeLeave.class);
    criteria.add(Restrictions.eq("employeeId", employeeId));
    criteria.addOrder(Order.desc("date_of_apply"));

    List<EmployeeLeave> results = criteria.list();
    logger.info("leaves in dao: " + results);

    return results;

  }

  /**
   * This method is to read all employee leave details from database in ascending order of applied
   * date.
   * 
   * @return list of employee leave objects
   */
  public List<EmployeeLeave> getEmployeeLeaveDetails() {

    return HibernateSessionUtility.getHibernateSession().createCriteria(EmployeeLeave.class)
        .addOrder(Order.desc("date_of_apply")).list();

  }

  /**
   * This method is to approve or disapprove employee leave
   * 
   * @param employeeLeaveId
   *          leave Id(primary key) to update
   * @param leaveStatus
   *          message weather it is approved or not
   * @return 1 on successful update, 0 if unsuccessful
   */
  public int updateLeaveStatus(int employeeLeaveId, String leaveStatus) {

    return HibernateSessionUtility.getHibernateSession()
        .createQuery(
            "update EmployeeLeave set isApproved=:approve,notifyStatus=1 where leaveId=:id")
        .setParameter("approve", leaveStatus).setParameter("id", employeeLeaveId).executeUpdate();

  }

  /**
   * This method is to find out employee leave details of given employee between given start and end
   * dates.
   * 
   * @param employeeId
   *          employee id for searching
   * @param startDate
   *          date for search start date
   * @param endDate
   *          date for search stop date
   * @return list of employee leave details
   */
  public List<EmployeeLeave> getEmployeeLeaveDetails(int employeeId, Date startDate, Date endDate) {

    return HibernateSessionUtility.getHibernateSession().createCriteria(EmployeeLeave.class)
        .add(Restrictions.and(Restrictions.eq("employeeId", employeeId),
            Restrictions.between("date_of_apply", startDate, endDate)))
        .list();
  }

  /**
   * This method is to read EmployeeLeave class object from database based on given leaveId if given
   * leave id is not there then returns null
   * 
   * @param leaveId
   *          primary key of object to read from database
   * @return employee leave class object
   */
  public EmployeeLeave getEmployeeLeaveDetaisByLeaveId(int leaveId) {

    return (EmployeeLeave) HibernateSessionUtility.getHibernateSession().get(EmployeeLeave.class,
        leaveId);
  }

  /**
   * Method to get all pending leaves
   */
  public List<EmployeeLeave> getAllPendingLeaves() {

    return HibernateSessionUtility.getHibernateSession().createCriteria(EmployeeLeave.class)
        .add(Restrictions.ilike("isApproved", EmsConditions.EMPLOYEE_LEAVE_PENDING)).list();
  }

  /**
   * This method is to get all employee approved leaves between given dates
   * 
   * @param startDate
   *          start date for searching
   * @param endDate
   *          end date for searching
   * @return list of approved leave details between given dates
   */
  public List<Object> getAllEmployeeApprovedLeaves(Date startDate, Date endDate) {

    return HibernateSessionUtility.getHibernateSession()
        .createQuery(
            "select l.employeeId,l.name,dates.leaveDate  from EmployeeLeave l join l.setOfLeaveDates as dates where l.isApproved = :status and dates.leaveDate between :startDate and :endDate")
        .setParameter("status", EmsConditions.EMPLOYEE_LEAVE_APPROVED)
        .setParameter("startDate", startDate).setParameter("endDate", endDate).list();
  }

  /**
   * This method is to return list of all disapproved leave details.
   */
  public List<EmployeeLeave> getAllDisapprovedLeaveDetails() {
    return HibernateSessionUtility.getHibernateSession().createCriteria(EmployeeLeave.class)
        .add(Restrictions.ilike("isApproved", EmsConditions.EMPLOYEE_LEAVE_DIS_APPROVED))
        .addOrder(Order.desc("date_of_apply")).list();
  }

  /**
   * This method is to return list of employee leave class objects which are applied between given
   * dates
   * 
   * @param startDate
   *          start date for searching
   * @param endDate
   *          end date for searching
   * @return returns list of employee leave class objects which are applied between given dates
   */
  public List<EmployeeLeave> getLeaveDetailsBetweenDates(Date startDate, Date endDate) {

    return HibernateSessionUtility.getHibernateSession().createCriteria(EmployeeLeave.class)
        .add(Restrictions.between("date_of_apply", startDate, endDate))
        .addOrder(Order.desc("date_of_apply")).list();
  }

  public Long getNewNotificationCount() {

    logger.info("In dao getNewNotificationCount()");
    // Long notification_count=(long) 0;
    Session session = HibernateSessionUtility.getHibernateSession();
    Criteria crit = session.createCriteria(EmployeeLeave.class);
    crit.add(Restrictions.eq("notifyStatus", 0));
    crit.setProjection(Projections.rowCount());
    Long notification_count = (Long) crit.uniqueResult();
    System.out.println("New Notification count  :" + notification_count);

    return notification_count;

  }

  public List<EmployeeLeave> getNewNotificationData() {

    Session session = HibernateSessionUtility.getHibernateSession();
    Criteria criteria = session.createCriteria(EmployeeLeave.class);
    criteria.add(Restrictions.like("isApproved", "Pending", MatchMode.EXACT));
    criteria.addOrder(Order.desc("leaveId"));

    List<EmployeeLeave> list = criteria.list();
    logger.info(" in dao: " + list);

    SQLQuery qry = session.createSQLQuery(
        "UPDATE PRAKASH.EMPLOYEE_LEAVE_TABLE SET NOTIFY_STATUS = 1 WHERE NOTIFY_STATUS= 0");
    int res = qry.executeUpdate();
    return list;
  }

}
