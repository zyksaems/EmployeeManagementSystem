package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRAKASH.employeePassword_table")
public class EncryptedEmployee implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  private int employeeId;

  @Column(name = "password")
  private byte[] encryptedPassword;

  private int locked;

  private int attemptCount;

  public int getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(int employeeId) {
    this.employeeId = employeeId;
  }

  public byte[] getEncryptedPassword() {
    return encryptedPassword;
  }

  public void setEncryptedPassword(byte[] encryptedPassword) {
    this.encryptedPassword = encryptedPassword;
  }

  public int getLocked() {
    return locked;
  }

  public void setLocked(int locked) {
    this.locked = locked;
  }

  public int getAttemptCount() {
    return attemptCount;
  }

  public void setAttemptCount(int attemptCount) {
    this.attemptCount = attemptCount;
  }

  @Override
  public String toString() {
    return "EncryptedEmployee [employeeId=" + employeeId + ", encryptedPassword="
        + Arrays.toString(encryptedPassword) + ", locked=" + locked + ", attemptCount="
        + attemptCount + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
        + ", toString()=" + super.toString() + "]";
  }

}
