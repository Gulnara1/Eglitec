/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec;

/**
 *
 * @author proliant
 */
public class PageData {

    /**
     * @return the chartJson
     */
    public String getChartJson() {
        return chartJson;
    }

    /**
     * @param chartJson the chartJson to set
     */
    public void setChartJson(String chartJson) {
        this.chartJson = chartJson;
    }

    /**
     * @return the tableJson
     */
    public String getTableJson() {
        return tableJson;
    }

    /**
     * @param tableJson the tableJson to set
     */
    public void setTableJson(String tableJson) {
        this.tableJson = tableJson;
    }
    private String chartJson;
    private String tableJson;
}
