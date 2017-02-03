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

            organization.setAbc(rs.getString("abc"));
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

    public List<Price> getStoresForPrice(Param param) {

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

    public List<Price> getCategoriesForPrice() {

        List<Price> listCategories = new ArrayList<Price>();

        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement(Selects.SELECT_CATEGORIES_FOR_PRICE);

            ResultSet rs = stmt.executeQuery();

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

    public List<Price> getItemsForPrice(Param param) {

        List<Price> itemsList = new ArrayList<Price>();
        PreparedStatement stmt = null;
        try {

            stmt = conn.prepareStatement(Selects.SELECT_ITEMS_FOR_PRICES);
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
                price.setPed(rs.getFloat("ped"));
                price.setPriceCurr(rs.getFloat("price_curr"));
                price.setPriceNext(rs.getFloat("price_next"));
                price.setSalesNext(rs.getFloat("sales_next"));
                price.setGprofitNext(rs.getFloat("gprofit_next"));
                price.setPriceOptim(rs.getFloat("price_optim"));
                price.setSalesOptim(rs.getFloat("sales_optim"));
                price.setGprofitOptim(rs.getFloat("gprofit_optim"));
                itemsList.add(price);
            }
        } catch (Exception ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.info(ex);
        }
        return itemsList;
    }

    public List<Organization> getStoresForSettings() {

        List<Organization> storesList = new ArrayList<Organization>();
        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(Selects.SELECT_STORES_FOR_SETTINGS);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Organization organization = new Organization();
                organization.setId(rs.getInt("id"));
                organization.setDesc(rs.getString("descr"));
                organization.setFloorSpace(rs.getFloat("floor_space"));
                organization.setAbc(rs.getString("abc"));
                organization.setIsPriceAuto(rs.getInt("is_price_auto"));
                organization.setIsPriceRounding(rs.getInt("is_price_rounding"));
                organization.setPriceChangeStep(rs.getFloat("price_change_step"));
                organization.setPriceOptimGoal(rs.getInt("price_optim_goal"));
                storesList.add(organization);
            }

        } catch (SQLException ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.error(ex);
        }
        return storesList;
    }
    public boolean updateStoresForSettings(Organization organization) {
        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(Selects.UPDATE_STORES_FOR_SETTINGS);
            stmt.setInt(1, organization.getIsPriceAuto());
            stmt.setInt(2, organization.getIsPriceRounding());
            stmt.setFloat(3, organization.getPriceChangeStep());
            stmt.setInt(4, organization.getPriceOptimGoal());
            stmt.setInt(5, organization.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.error(ex);
            return false;
        } 
    }
    public List<Organization> getCategoriesForSetting(){
        
        List<Organization> catList = new ArrayList<Organization>();
        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(Selects.SELECT_CATEGORIES_FOR_SETTINGS);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Organization organization = new Organization();
                organization.setId(rs.getInt("id"));
                organization.setDesc(rs.getString("descr"));
                organization.setFloorSpace(rs.getFloat("floor_space"));
                organization.setAbc(rs.getString("abc"));
                organization.setIsPriceAuto(rs.getInt("is_price_auto"));
                organization.setIsPriceRounding(rs.getInt("is_price_rounding"));
                organization.setPriceChangeStep(rs.getFloat("price_change_step"));
                organization.setPriceOptimGoal(rs.getInt("price_optim_goal"));
                catList.add(organization);
            }

        } catch (SQLException ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.error(ex);
        }
        
        return catList;
    }
    public boolean updateCategoriesForSettings(Organization organization) {
        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(Selects.UPDATE_CATEGORIES_FOR_SETTINGS);
            stmt.setInt(1, organization.getIsPriceAuto());
            stmt.setInt(2, organization.getIsPriceRounding());
            stmt.setFloat(3, organization.getPriceChangeStep());
            stmt.setInt(4, organization.getPriceOptimGoal());
            stmt.setInt(5, organization.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException ex) {
            Logger.getLogger(DataBaseManager.class.getName()).log(Level.SEVERE, null, ex);
            log.error(ex);
            return false;
        } 
    }
}
