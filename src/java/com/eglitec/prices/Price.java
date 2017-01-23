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
    public Integer getPed() {
        return ped;
    }

    /**
     * @param ped the ped to set
     */
    public void setPed(Integer ped) {
        this.ped = ped;
    }

    /**
     * @return the priceCurr
     */
    public Integer getPriceCurr() {
        return priceCurr;
    }

    /**
     * @param priceCurr the priceCurr to set
     */
    public void setPriceCurr(Integer priceCurr) {
        this.priceCurr = priceCurr;
    }

    /**
     * @return the priceNext
     */
    public Integer getPriceNext() {
        return priceNext;
    }

    /**
     * @param priceNext the priceNext to set
     */
    public void setPriceNext(Integer priceNext) {
        this.priceNext = priceNext;
    }

    /**
     * @return the priceOptim
     */
    public Integer getPriceOptim() {
        return priceOptim;
    }

    /**
     * @param priceOptim the priceOptim to set
     */
    public void setPriceOptim(Integer priceOptim) {
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
    public Integer getSalesOptim() {
        return salesOptim;
    }

    /**
     * @param salesOptim the salesOptim to set
     */
    public void setSalesOptim(Integer salesOptim) {
        this.salesOptim = salesOptim;
    }

    /**
     * @return the gprofitOptim
     */
    public Integer getGprofitOptim() {
        return gprofitOptim;
    }

    /**
     * @param gprofitOptim the gprofitOptim to set
     */
    public void setGprofitOptim(Integer gprofitOptim) {
        this.gprofitOptim = gprofitOptim;
    }

    /**
     * @return the salesNext
     */
    public Integer getSalesNext() {
        return salesNext;
    }

    /**
     * @param salesNext the salesNext to set
     */
    public void setSalesNext(Integer salesNext) {
        this.salesNext = salesNext;
    }

    /**
     * @return the gprofitNext
     */
    public Integer getGprofitNext() {
        return gprofitNext;
    }

    /**
     * @param gprofitNext the gprofitNext to set
     */
    public void setGprofitNext(Integer gprofitNext) {
        this.gprofitNext = gprofitNext;
    }
    
    private Integer idStore;
    private Integer idCat;
    private String descr;
    private String abc;
    private Integer salesOptim;
    private Integer gprofitOptim;
    private Integer salesNext;
    private Integer gprofitNext;
    private Integer idItem;
    private Integer ped;
    private Integer priceCurr;
    private Integer priceNext;
    private Integer priceOptim;
}
