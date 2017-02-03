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
public class Selects {

    public static final String SELECT_ALL_ABC = "select distinct o.abc from egl.egl_d_org o where o.abc is not null ORDER BY o.abc;";
    public static final String SELECT_ALL_CLASTERS = "select distinct o.cluster_id from egl.egl_d_org o where o.cluster_id is not null ORDER BY o.cluster_id;";
    public static final String SELECT_TICKETS_SALES_GROSSPROFIT_FOR_CHART = "select s.abc,\n"
            + "	sum(s.floor_space) floor_space,\n"
            + "	sum(a.sales) sales, \n"
            + "	sum(a.sales-a.cogs-discount) gross_profit,\n"
            + "	sum(a.tickets) tickets\n"
            + "  from egl.egl_s_sls_org_a a\n"
            + "  join egl.egl_d_org s on s.id = a.fk_org\n"
            + "where a.time_id between ? and ?\n"
            + "and (s.abc = ? or s.abc = ? or s.abc = ?)"
            + "group by s.abc\n"
            + "order by s.abc";
    public static final String SELECT_TICKETS_SALES_GROSSPROFIT_FOR_TABLE = "select s.id fk_org, s.descr, s.floor_space, s.cluster_id,\n"
            + "	sum(s.floor_space) floor_space_sum,\n"
            + "	sum(a.sales) sales, \n"
            + "	sum(a.sales-a.cogs-discount) gross_profit,\n"
            + "	sum(a.tickets) tickets\n"
            + "  from egl.egl_s_sls_org_a a\n"
            + "  join egl.egl_d_org s on s.id = a.fk_org\n"
            + "where a.time_id between ? and ?\n"
            + "and (s.abc = ? or s.abc = ? or s.abc = ?)"
            + "group by s.cluster_id, s.id, s.descr, s.floor_space\n"
            + "order by cluster_id";
    public static final String SELECT_STORES_FOR_PRICE = "select 	a.id fk_org, a.descr store_descr, a.abc,\n"
            + "	sum(f.sales_optim_qty*f.price_optim) sales_optim,\n"
            + "	sum(f.sales_optim_qty*(f.price_optim-f.unitcost)) gprofit_optim,\n"
            + "	sum(f.sales_next_qty*f.price_optim) sales_next,\n"
            + "	sum(f.sales_next_qty*(f.price_next-f.unitcost)) gprofit_next\n"
            + "from egl.egl_d_org a\n"
            + "left outer join egl.egl_s_sls_prd_f_m f on a.id = f.fk_org \n"
            + "  and f.month_id = ? -- based on top level filter\n"
            + "where a.floor_space > 0\n"
            + "and (a.abc = ? or a.abc = ? or a.abc = ?)\n"
            + "and a.is_price_auto >0"
            + "group by a.id, a.descr, a.abc, a.floor_space\n"
            + "order by gprofit_optim";
    public static final String SELECT_CATEGORIES_FOR_PRICE = "select 	g.id fk_prd_pgr, g.long_descr pgr_descr,\n"
            + "	sum(f.sales_optim_qty*f.price_optim) sales_optim,\n"
            + "	sum(f.sales_optim_qty*(f.price_optim-f.unitcost)) gprofit_optim,\n"
            + "	sum(f.sales_next_qty*f.price_optim) sales_next,\n"
            + "	sum(f.sales_next_qty*(f.price_next-f.unitcost)) gprofit_next\n"
            + "from egl.egl_d_prd_gr g \n"
            + "join egl.egl_d_prd p on g.id = p.fk_prd_pgr\n"
            + "left outer join egl.egl_s_sls_prd_f_m f on p.id = f.fk_prd\n"
            + "where g.id > 900000000\n"
            + "and g.is_price_auto > 0\n"
            + "group by g.id, g.long_descr\n"
            + "order by gprofit_optim";
    public static final String SELECT_ITEMS_FOR_PRICES = "select 	p.id fk_prd, p.descr prd_descr, ped,\n"
            + "	f.price_curr, 	f.price_next,\n"
            + "	f.sales_next_qty*f.price_optim sales_next,\n"
            + "	f.sales_next_qty*(f.price_next-f.unitcost) gprofit_next,\n"
            + "	f.price_optim,\n"
            + "	f.sales_optim_qty*f.price_optim sales_optim,\n"
            + "	f.sales_optim_qty*(f.price_optim-f.unitcost) gprofit_optim\n"
            + "from egl.egl_s_sls_prd_f_m f \n"
            + "join egl.egl_d_prd p on p.id = f.fk_prd\n"
            + "join egl.egl_d_prd_gr g on g.id = p.fk_prd_pgr \n"
            + "where f.fk_org = ? \n"
            + "and f.month_id = ? \n"
            + "and g.id = ? \n"
            + "and f.ped < 0\n"
            + "and f.price_next-f.unitcost>0\n"
            + "order by ped";
    public static final String SELECT_STORES_FOR_SETTINGS = "SELECT o.id, o.descr, \n"
            + "o.floor_space, \n"
            + "o.abc, \n"
            + "o.is_price_auto, \n"
            + "o.is_price_rounding, \n"
            + "o.price_change_step,\n"
            + "o.price_optim_goal \n"
            + "FROM egl.egl_d_org o\n"
            + "where o.floor_space > 0";
    public static final String UPDATE_STORES_FOR_SETTINGS = "UPDATE egl.egl_d_org  \n"
            + "SET is_price_auto = ?,\n"
            + "is_price_rounding = ?,\n"
            + "price_change_step = ?,\n"
            + "price_optim_goal = ?\n"
            + "where id = ?";
    public static final String SELECT_CATEGORIES_FOR_SETTINGS = "select 	g.id fk_prd_pgr, \n"
            + "    g.long_descr pgr_descr, \n"
            + "    g.is_price_auto,\n"
            + "    g.is_price_roundig,\n"
            + "    g.price_change_step,\n"
            + "    g.price_optim_goal\n"
            + "from egl.egl_d_prd_gr g\n"
            + "where g.id > 900000000";
    public static final String UPDATE_CATEGORIES_FOR_SETTINGS = "UPDATE egl.egl_d_prd_gr \n"
            + "SET is_price_auto = ?,\n"
            + "    is_price_roundig = ?,\n"
            + "    price_change_step = ?,\n"
            + "    price_optim_goal = ?\n"
            + "where id = ?";
}
