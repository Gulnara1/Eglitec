/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec;

import com.eglitec.stores.UploadStoresMainIndexes;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;

/**
 *
 * @author proliant
 */
public class LineChartServlet extends HttpServlet {

    private Logger logger = Logger.getLogger(UploadStoresMainIndexes.class);

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            Connection conn = (Connection) getServletContext().getAttribute("DBConnection");
            DataBaseManager dbm = new DataBaseManager(conn);

            // List<Organization> listOrgs = dbm.getOrganizationInPeriod(Integer.parseInt(request.getParameter("org")), 
            //       Integer.parseInt(request.getParameter("toDate")), 
            //     Integer.parseInt(request.getParameter("fromDate")));
            Gson gson = new Gson();
            //  String jsonString = gson.toJson(listOrgs);

            response.setContentType("application/json");

            // response.getWriter().write(jsonString);
            processRequest(request, response);

        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
