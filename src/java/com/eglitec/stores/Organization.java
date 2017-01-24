/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.stores;

/**
 *
 * @author proliant
 */
public class Organization {

    /**
     * @return the isPriceAuto
     */
    public int getIsPriceAuto() {
        return isPriceAuto;
    }

    /**
     * @param isPriceAuto the isPriceAuto to set
     */
    public void setIsPriceAuto(int isPriceAuto) {
        this.isPriceAuto = isPriceAuto;
    }

    /**
     * @return the isPriceRounding
     */
    public int getIsPriceRounding() {
        return isPriceRounding;
    }

    /**
     * @param isPriceRounding the isPriceRounding to set
     */
    public void setIsPriceRounding(int isPriceRounding) {
        this.isPriceRounding = isPriceRounding;
    }

    /**
     * @return the priceChangeStep
     */
    public float getPriceChangeStep() {
        return priceChangeStep;
    }

    /**
     * @param priceChangeStep the priceChangeStep to set
     */
    public void setPriceChangeStep(float priceChangeStep) {
        this.priceChangeStep = priceChangeStep;
    }

    /**
     * @return the priceOptimGoal
     */
    public int getPriceOptimGoal() {
        return priceOptimGoal;
    }

    /**
     * @param priceOptimGoal the priceOptimGoal to set
     */
    public void setPriceOptimGoal(int priceOptimGoal) {
        this.priceOptimGoal = priceOptimGoal;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the desc
     */
    public String getDesc() {
        return desc;
    }

    /**
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
    }

    /**
     * @return the clusterId
     */
    public int getClusterId() {
        return clusterId;
    }

    /**
     * @param clusterId the clusterId to set
     */
    public void setClusterId(int clusterId) {
        this.clusterId = clusterId;
    }

    /**
     * @return the floorSpace
     */
    public float getFloorSpace() {
        return floorSpace;
    }

    /**
     * @param floorSpace the floorSpace to set
     */
    public void setFloorSpace(float floorSpace) {
        this.floorSpace = floorSpace;
    }

    /**
     * @return the sales
     */
    public int getSales() {
        return sales;
    }

    /**
     * @param sales the sales to set
     */
    public void setSales(int sales) {
        this.sales = sales;
    }

    /**
     * @return the grossProfit
     */
    public int getGrossProfit() {
        return grossProfit;
    }

    /**
     * @param grossProfit the grossProfit to set
     */
    public void setGrossProfit(int grossProfit) {
        this.grossProfit = grossProfit;
    }

    /**
     * @return the tickets
     */
    public int getTickets() {
        return tickets;
    }

    /**
     * @param tickets the tickets to set
     */
    public void setTickets(int tickets) {
        this.tickets = tickets;
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
    
    private int id;
    private String desc;
    private int clusterId;
    private float floorSpace;
    private int sales;
    private int grossProfit;
    private int tickets;
    private String abc;
    private int isPriceAuto;
    private int isPriceRounding;
    private float priceChangeStep;
    private int priceOptimGoal;
}
