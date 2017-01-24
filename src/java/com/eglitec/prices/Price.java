/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eglitec.prices;

/**
 *
 * @author proliant
 */
public class Price {

    /**
     * @return the idItem
     */
    public Integer getIdItem() {
        return idItem;
    }

    /**
     * @param idItem the idItem to set
     */
    public void setIdItem(Integer idItem) {
        this.idItem = idItem;
    }

    /**
     * @return the ped
     */
    public float getPed() {
        return ped;
    }

    /**
     * @param ped the ped to set
     */
    public void setPed(float ped) {
        this.ped = ped;
    }

    /**
     * @return the priceCurr
     */
    public float getPriceCurr() {
        return priceCurr;
    }

    /**
     * @param priceCurr the priceCurr to set
     */
    public void setPriceCurr(float priceCurr) {
        this.priceCurr = priceCurr;
    }

    /**
     * @return the priceNext
     */
    public float getPriceNext() {
        return priceNext;
    }

    /**
     * @param priceNext the priceNext to set
     */
    public void setPriceNext(float priceNext) {
        this.priceNext = priceNext;
    }

    /**
     * @return the priceOptim
     */
    public float getPriceOptim() {
        return priceOptim;
    }

    /**
     * @param priceOptim the priceOptim to set
     */
    public void setPriceOptim(float priceOptim) {
        this.priceOptim = priceOptim;
    }

    /**
     * @return the idCat
     */
    public Integer getIdCat() {
        return idCat;
    }

    /**
     * @param idCat the idCat to set
     */
    public void setIdCat(Integer idCat) {
        this.idCat = idCat;
    }

    /**
     * @return the id
     */
    public Integer getIdStore() {
        return idStore;
    }

    /**
     * @param id the id to set
     */
    public void setIdStore(Integer idStore) {
        this.idStore = idStore;
    }

    /**
     * @return the descr
     */
    public String getDescr() {
        return descr;
    }

    /**
     * @param descr the descr to set
     */
    public void setDescr(String descr) {
        this.descr = descr;
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
     * @return the salesOptim
     */
    public float getSalesOptim() {
        return salesOptim;
    }

    /**
     * @param salesOptim the salesOptim to set
     */
    public void setSalesOptim(float salesOptim) {
        this.salesOptim = salesOptim;
    }

    /**
     * @return the gprofitOptim
     */
    public float getGprofitOptim() {
        return gprofitOptim;
    }

    /**
     * @param gprofitOptim the gprofitOptim to set
     */
    public void setGprofitOptim(float gprofitOptim) {
        this.gprofitOptim = gprofitOptim;
    }

    /**
     * @return the salesNext
     */
    public float getSalesNext() {
        return salesNext;
    }

    /**
     * @param salesNext the salesNext to set
     */
    public void setSalesNext(float salesNext) {
        this.salesNext = salesNext;
    }

    /**
     * @return the gprofitNext
     */
    public float getGprofitNext() {
        return gprofitNext;
    }

    /**
     * @param gprofitNext the gprofitNext to set
     */
    public void setGprofitNext(float gprofitNext) {
        this.gprofitNext = gprofitNext;
    }
    
    private Integer idStore;
    private Integer idCat;
    private String descr;
    private String abc;
    private float salesOptim;
    private float gprofitOptim;
    private float salesNext;
    private float gprofitNext;
    private Integer idItem;
    private float ped;
    private float priceCurr;
    private float priceNext;
    private float priceOptim;
}
