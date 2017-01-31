/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.stores;

import com.eglitec.DataBaseManager;
import com.google.gson.Gson;
import java.io.IOException;
import java.sql.Connection;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author proliant
 */
public class StoresSettings extends HttpServlet {

    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(StoresSettings.class);

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("text/html;charset=UTF-8");
            Connection conn = (Connection) getServletContext().getAttribute("DBConnection");
            DataBaseManager dbm = new DataBaseManager(conn);
            Gson gson = new Gson();
            
            if(request.getParameter("id")!=null){
                Organization organization = new Organization();
                organization.setIsPriceAuto(Integer.parseInt(request.getParameter("isPriceAuto")));
                logger.info("1");
                organization.setIsPriceRounding(Integer.parseInt(request.getParameter("isPriceRounding")));
                logger.info("2");
                organization.setPriceChangeStep(Float.parseFloat(request.getParameter("priceChangeStep")));
                logger.info("3");
                organization.setPriceOptimGoal(Integer.parseInt(request.getParameter("priceOptimGoal")));
                logger.info("4");
                organization.setId(Integer.parseInt(request.getParameter("id")));
                logger.info("5");
                dbm.updateStoresForSettings(organization);
                logger.info("6");
            }
            
            List<Organization> storesList = dbm.getStoresForSettings();
            String dataJson = gson.toJson(storesList);
            response.setContentType("application/json");

            response.getWriter().write(dataJson);
            processRequest(request, response);

        } catch (Exception ex) {
            Logger.getLogger(StoresSettings.class.getName()).log(Level.SEVERE, null, ex);
            logger.error(ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
