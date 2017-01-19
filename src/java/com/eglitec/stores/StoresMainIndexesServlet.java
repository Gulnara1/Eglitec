/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.stores;

import com.eglitec.DataBaseManager;
import com.eglitec.PageData;
import com.eglitec.Param;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author proliant
 */
@WebServlet(name = "StoresMainIndexesServlet", urlPatterns = {"/StoresMainIndexesServlet"})
public class StoresMainIndexesServlet extends HttpServlet {

    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(UploadStoresMainIndexes.class);

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    @SuppressWarnings("empty-statement")
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            Connection conn = (Connection) getServletContext().getAttribute("DBConnection");
            DataBaseManager dbm = new DataBaseManager(conn);
            Gson gson = new Gson();
            PageData pageData = new PageData();
            Param param = new Param();
            
            param.setAbc(request.getParameter("abc"));
            param.setFromDate(Integer.parseInt(request.getParameter("fromDate")));
            param.setToDate(Integer.parseInt(request.getParameter("toDate")));
            
            List<Organization> listOrgsChart = dbm.getTicketSaleGrossprofitForChart(param);
            String chartJson = gson.toJson(listOrgsChart);
            List<Organization> listOrgsTable = dbm.getTicketSaleGrossprofitForTable(param);
            String tableJson = gson.toJson(listOrgsTable);

            
            pageData.setChartJson(chartJson);
            pageData.setTableJson(tableJson);
            
            String dataJson = gson.toJson(pageData);
            
            response.setContentType("application/json");

            response.getWriter().write(dataJson);
            processRequest(request, response);

        } catch (SQLException ex) {
            Logger.getLogger(StoresMainIndexesServlet.class.getName()).log(Level.SEVERE, null, ex);
            logger.info(ex);
        }

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
