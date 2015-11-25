package com.caprusit.ems.dao;

import java.util.List;

import com.caprusit.ems.domain.Admin;
import com.caprusit.ems.domain.Employee;

public interface ISecurityDAO {
	public String login(Admin admin);

	public List<Object> forgotPassword(int adminId);

	public String changePassword(Admin admin);

	public List<String> getOldPassword(Admin admin);

	public int saveEmployee(Employee emp);
}
