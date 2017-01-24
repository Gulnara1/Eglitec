/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec;

import java.util.ArrayList;

/**
 *
 * @author proliant
 */
public class Param {

    /**
     * @return the p
     */
    public char getP() {
        return p;
    }

    /**
     * @param p the p to set
     */
    public void setP(char p) {
        this.p = p;
    }

    /**
     * @return the fromDate
     */
    public Integer getFromDate() {
        return fromDate;
    }

    /**
     * @param fromDate the fromDate to set
     */
    public void setFromDate(Integer fromDate) {
        this.fromDate = fromDate;
    }

    /**
     * @return the toDate
     */
    public Integer getToDate() {
        return toDate;
    }

    /**
     * @param toDate the toDate to set
     */
    public void setToDate(Integer toDate) {
        this.toDate = toDate;
    }

    /**
     * @return the abc
     */
    public String getAbc() {
        return abc;
    }

    /**
     * @param abc the abc to set
     */
    public void setAbc(String abc) {
        this.abc = abc;
    }

    /**
     * @return the stores
     */
    public ArrayList<Integer> getStoreIds() {
        return stores;
    }

    /**
     * @param stores the stores to set
     */
    public void setStoreIds(ArrayList<Integer> stores) {
        this.stores = stores;
    }

    /**
     * @return the categories
     */
    public ArrayList<Integer> getCategoriesId() {
        return categories;
    }

    /**
     * @param categories the categories to set
     */
    public void setCategoriesId(ArrayList<Integer> categories) {
        this.categories = categories;
    }
    
    private Integer fromDate;
    private Integer toDate;
    private String abc;
    private ArrayList<Integer> stores;
    private ArrayList<Integer> categories;
    private char p;
}
