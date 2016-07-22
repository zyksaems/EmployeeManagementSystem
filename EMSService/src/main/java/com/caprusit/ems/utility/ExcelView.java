package com.caprusit.ems.utility;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.caprusit.ems.domain.Employee;

@SuppressWarnings("deprecation")
public class ExcelView extends AbstractExcelView {
  @Override
  protected void buildExcelDocument(@SuppressWarnings("rawtypes") Map model, HSSFWorkbook workbook,
      HttpServletRequest request, HttpServletResponse response) throws Exception {

    Logger logger = Logger.getLogger(getClass().getName());
    @SuppressWarnings("unchecked")
    List<Employee> employees = (List<Employee>) model.get("employees");
    logger.info("in ExcelView utility :" + employees);
    response.setContentType("application/vnd.ms-excel");
    HSSFSheet sheet = workbook.createSheet("Employee Report");
    logger.info("sheet created" + sheet.getSheetName());
    HSSFRow header = sheet.createRow(0);
    header.createCell(0).setCellValue("Employee Id");
    header.createCell(1).setCellValue("First Name");
    header.createCell(2).setCellValue("Last Name");
    header.createCell(3).setCellValue("Date of Birth");
    header.createCell(4).setCellValue("Mobile No");
    header.createCell(5).setCellValue("Email Id");
    header.createCell(6).setCellValue("Designation");
    header.createCell(7).setCellValue("Role Id");
    header.createCell(8).setCellValue("Status");
    header.createCell(9).setCellValue("Department Id");

    logger.info("sheet  header created" + header.getSheet());
    int counter = 1;
    for (Employee e : employees) {
      HSSFRow row = sheet.createRow(counter++);
      row.createCell(0).setCellValue(e.getEmployeeId());
      row.createCell(1).setCellValue(e.getFirstName());
      row.createCell(2).setCellValue(e.getLastName());
      logger.info(e.getDob() + " DOB");
      DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
      String requiredDate = dateFormat.format(e.getDob());
      row.createCell(3).setCellValue(requiredDate);
      row.createCell(4).setCellValue("" + e.getMobileNo());
      row.createCell(5).setCellValue(e.getEmailId());
      row.createCell(6).setCellValue(e.getDesignation());
      row.createCell(7).setCellValue("" + e.getRollId());
      row.createCell(8).setCellValue("" + e.getStatus());
      row.createCell(9).setCellValue("" + e.getDeptId());

    }
  }

}