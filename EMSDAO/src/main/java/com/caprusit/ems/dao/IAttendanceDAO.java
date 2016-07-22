package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;

import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.User;

public interface IAttendanceDAO {

  public int inTime(Attendance attendance);

  public int outTime(User user);

  List<Integer> getStillWorkingEmployeeIds();

  List<Object> getAbsentEmployeeDetails();

  int deleteAttendanceByEmployeeIdAndDate(int employeeId, Date attendanceDate);
}
