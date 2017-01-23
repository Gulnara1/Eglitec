/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec;

import com.eglitec.prices.Price;
import com.eglitec.stores.Organization;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author proliant
 */
public class DataBaseManager {

    private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(DataBaseManager.class);
    private Connection conn;

    public DataBaseManager(Connection connection) {
        conn = connection;
    }

    public List<Organization> getABC() throws SQLException {

        List<Organization> listOrgs = new ArrayList<Organization>();
        PreparedStatement stmt = conn.prepareStatement(Selects.SELECT_ALL_ABC);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            Organization organization = new Organization();
            organization.setAbc(rs.getString("abc"));
            listOrgs.add(organization);
        }
        return listOrgs;
    }

    public List<Organization> getTicketSaleGrossprofitForChart(Param param) throws SQLException {
        List<Organization> listOrgs = new ArrayList<Organization>();

        PreparedStatement stmt = conn.prepareStatement(Selects.SELECT_TICKETS_SALES_GROSSPROFIT_FOR_CHART);

        stmt.setInt(1, param.getFromDate());
        stmt.setInt(2, param.getToDate());
        for (int i = 0; i < param.getAbc().length(); i++) {
            stmt.setString(3 + i, param.getAbc().charAt(i) + "");
        }

        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            Organization organization = new Organization();

            organization.setClusterId(rs.getInt("cluster_id"));
            organization.setFloorSpace(rs.getInt("floor_space"));
            organization.setSales(rs.getInt("sales"));
            organization.setGrossProfit(rs.getInt("gross_profit"));
            organization.setTickets(rs.getInt("tickets"));

            listOrgs.add(organization);
        }
        return listOrgs;
    }

    public List<Organization> getTicketSaleGrossprofitForTable(Param param) throws SQLException {
        List<Organization> listOrgs = new ArrayList<Organization>();

        PreparedStatement stmt = conn.prepareStatement(Selects.SELECT_TICKETS_SALES_GROSSPROFIT_FOR_TABLE);

        stmt.setInt(1, param.getFromDate());
        stmt.setInt(2, param.getToDate());
        for (int i = 0; i < param.getAbc().length(); i++) {
            stmt.setString(3 + i, param.getAbc().charAt(i) + "");
        }

        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            Organization organization = new Organization();

            organization.setId(rs.getInt("fk_org"));
            organization.setDesc(rs.getString("descr"));
            organization.setFloorSpace(rs.getInt("floor_space"));
            organization.setClusterId(rs.getInt("cluster_id"));
            organization.setSales(rs.getInt("sales"));
            organization.setGrossProfit(rs.getInt("gross_profit"));
            organization.setTickets(rs.getInt("tickets"));

            listOrgs.add(organization);
        }

        return listOrgs;
    }

    public List<Price> getStores(Param param) {

        List<Price> listStores = new ArrayList<Price>();
        PreparedStatement stmt = null;
        try {

            stmt = conn.prepareStatement(Selects.SELECT_STORES_FOR_PRICE);
            stmt.setInt(1, param.getFromDate());
            for (int i = 0; i < param.getAbc().length(); i++) {
                stmt.setString(2 + i, param.getAbc().charAt(i) + "");
            }
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Price price = new Price();
                price.setDescr(rs.getString("store_descr"));
                price.setGprofitNext(rs.getInt("gprofit_next"));
                price.setAbc(rs.getString("abc"));
                price.setGprofitOptim(rs.getInt("gprofit_optim"));
                price.setIdStore(rs.getInt("fk_org"));
                price.setSalesNext(rs.getInt("sales_next"));
                price.setSalesOptim(rs.getInt("sales_optim"));
                listStores.add(price);
            }
        } catch (Exception ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.info(ex);
        }
        return listStores;
    }

    public List<Price> getCategories() {

        List<Price> listCategories = new ArrayList<Price>();
        log.info("1");
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement(Selects.SELECT_CATEGORIES_FOR_PRICE);
            log.info("2");
            ResultSet rs = stmt.executeQuery();
            log.info("3");
            while (rs.next()) {
                Price price = new Price();
                price.setIdCat(rs.getInt("fk_prd_pgr"));
                price.setDescr(rs.getString("pgr_descr"));
                price.setSalesOptim(rs.getInt("sales_optim"));
                price.setGprofitOptim(rs.getInt("gprofit_optim"));
                price.setSalesNext(rs.getInt("sales_next"));
                price.setGprofitNext(rs.getInt("gprofit_next"));
                listCategories.add(price);
            }
        } catch (Exception ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.info(ex);
        }
        return listCategories;
    }

    public List<Price> getItems(Param param) {
        
        List<Price> itemsList = new ArrayList<Price>();
        PreparedStatement stmt = null;
        try {

            stmt = conn.prepareStatement(Selects.SELECT_ITEMS_FOR_PRICES);
            //stmt.setInt(1, param.getFromDate());
//            for (int i = 0; i < param.getAbc().length(); i++) {
                stmt.setInt(1, param.getStoreIds().get(0));//only then one store selected
//            }
            stmt.setInt(2, param.getFromDate());
            stmt.setInt(3, param.getCategoriesId().get(0));//only then one category selected
            
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Price price = new Price();
                price.setIdItem(rs.getInt("fk_prd"));
                price.setDescr(rs.getString("prd_descr"));
                price.setPed(rs.getInt("ped"));
                price.setPriceCurr(rs.getInt("price_curr"));
                price.setPriceNext(rs.getInt("price_next"));
                price.setSalesNext(rs.getInt("sales_next"));
                price.setGprofitNext(rs.getInt("gprofit_next"));
                price.setPriceOptim(rs.getInt("price_optim"));
                price.setSalesOptim(rs.getInt("sales_optim"));
                price.setGprofitOptim(rs.getInt("gprofit_optim"));
                itemsList.add(price);
            }
        } catch (Exception ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.info(ex);
        }
        return itemsList;
    }
}
