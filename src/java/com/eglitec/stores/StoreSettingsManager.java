/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.stores;

import com.eglitec.DataBaseManager;
import com.google.gson.Gson;
import java.sql.Connection;
import java.util.ArrayList;

/**
 *
 * @author proliant
 */
public class StoreSettingsManager {

    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(StoreSettingsManager.class);

    public int parseJsonAndUpdateData(String jsonListOrgs, Connection conn) {

        DataBaseManager dbm = new DataBaseManager(conn);
        Gson gson = new Gson();

        ArrayList listOrgs = gson.fromJson(jsonListOrgs, ArrayList.class);
        for (int i = 0; i < listOrgs.size(); i++) {
            String jsonOrg = listOrgs.get(i).toString();
            Organization organization = gson.fromJson(jsonOrg, Organization.class);
            boolean isUpdated = dbm.updateStoresForSettings(organization);
            if (!isUpdated) {
                
                return organization.getId();
            }
        }
        return 1;
    }
}
