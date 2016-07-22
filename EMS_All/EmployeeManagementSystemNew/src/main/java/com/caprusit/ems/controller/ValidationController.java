package com.caprusit.ems.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.service.ValidationService;

/*
 * This controller is to send json object arrays to front-end
 * for client side validations
 * */

@Controller
public class ValidationController {

  @Autowired
  private ValidationService validationservice;
  private Logger logger = Logger.getLogger(ValidationController.class);

  /**
   * This method returns all employee Ids along with first name and last name in the json object
   * array format.
   */
  @RequestMapping(value = "/getAllEmpIds", method = RequestMethod.POST)
  public @ResponseBody String getAllEmployeeIds() {

    logger.info("inside validationController getAllEmpIds()");
    return validationservice.getAllEmployeeIds();

  }

  /**
   * This method returns employee Ids of employees who are logged-in into application in json array
   * format.
   */
  @RequestMapping(value = "/getLoggedInEmpIds", method = RequestMethod.POST)
  public @ResponseBody String getLoggedInEmployeeIds() {

    logger.info("inside validationController getLoggedInEmployeeIds()");
    return validationservice.getLoggedInEmoloyeeIds();

  }

  /**
   * This method returns employee Ids of employees who are logged-out from application in json array
   * format.
   */
  @RequestMapping(value = "/getLoggedOutEmpIds", method = RequestMethod.POST)
  public @ResponseBody String getLoggedOutEmployeeIds() {

    logger.info("inside validationController getLoggedOutEmployeeIds()");
    return validationservice.getLoggedOutEmployeeIds();

  }

  /**
   * This method returns all role Id and role names which are available in database in json object
   * array format.
   */
  @RequestMapping(value = "/getRoleIds", method = RequestMethod.POST)
  public @ResponseBody String getRoleIds() {

    logger.info("inside validationController getRoleIds()");
    return validationservice.getRoleIds();

  }

  /**
   * This method returns all department Id and department names which are available in database in
   * json object array format.
   */
  @RequestMapping(value = "/getDeptIds", method = RequestMethod.POST)
  public @ResponseBody String getDeptIds() {

    logger.info("inside validationController getDeptIds()");
    return validationservice.getDeptIds();

  }

}
