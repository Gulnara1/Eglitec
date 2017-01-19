/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.prices;

import com.eglitec.Param;
import com.eglitec.stores.UploadStoresMainIndexes;
import java.io.IOException;
import java.sql.Connection;
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
@WebServlet(name = "NextBestPricesServlet", urlPatterns = {"/NextBestPricesServlet"})
public class NextBestPricesServlet extends HttpServlet {

    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(UploadStoresMainIndexes.class);
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            processRequest(request, response);
            Connection conn = (Connection) getServletContext().getAttribute("DBConnection");
            Param param = new Param();
            param.setAbc(request.getParameter("abc"));
            param.setFromDate(Integer.parseInt(request.getParameter("dateMonth")));

            PricesPageManager ppm = new PricesPageManager();
            String dataJson = ppm.getJson(conn, param);
            response.setContentType("application/json");

            response.getWriter().write(dataJson);
            processRequest(request, response);
            
        } catch (IOException | NumberFormatException | ServletException ex) {
            Logger.getLogger(NextBestPricesServlet.class.getName()).log(Level.SEVERE, null, ex);
            logger.info(ex);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
