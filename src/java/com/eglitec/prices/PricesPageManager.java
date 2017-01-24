/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.prices;

import com.eglitec.Param;
import com.eglitec.DataBaseManager;
import com.eglitec.PageData;
import com.eglitec.stores.UploadStoresMainIndexes;
import com.google.gson.Gson;
import java.sql.Connection;
import java.util.List;

/**
 *
 * @author proliant
 */
public class PricesPageManager {

    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(PricesPageManager.class);
    public String getJson(Connection conn, Param param){

        DataBaseManager dbm = new DataBaseManager(conn);
        Gson gson = new Gson();
        PageData pageData = new PageData();
        if (param.getP() == 'i') {
            List<Price> itemsList = dbm.getItemsForPrice(param);
            return gson.toJson(itemsList);

        } else {
            List<Price> storesList = dbm.getStoresForPrice(param);
            List<Price> catList = dbm.getCategoriesForPrice();
                        
            pageData.setChartJson(gson.toJson(storesList));// it's not chart Json. We use this method only in nextBestPrices, becouse the page is different/
            pageData.setTableJson(gson.toJson(catList));///
            
            return gson.toJson(pageData);
         }
    }
}

