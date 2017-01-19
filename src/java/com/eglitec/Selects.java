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
    public static final String SELECT_TICKETS_SALES_GROSSPROFIT_FOR_CHART = "select s.cluster_id,\n"
            + "	sum(s.floor_space) floor_space,\n"
            + "	sum(a.sales) sales, \n"
            + "	sum(a.sales-a.cogs-discount) gross_profit,\n"
            + "	sum(a.tickets) tickets\n"
            + "  from egl.egl_s_sls_org_a a\n"
            + "  join egl.egl_d_org s on s.id = a.fk_org\n"
            + "where a.time_id between ? and ?\n"
            + "and (s.abc = ? or s.abc = ? or s.abc = ?)"
            + "group by s.cluster_id\n"
            + "order by cluster_id";
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
    public static final String SELECT_CATEGORIES_FOR_PRICE = "with	g as (select * from egl.egl_d_prd_gr where id > 900000000),\n"
            + "	p as (select * from egl.egl_d_prd),\n"
            + "	f as (select * from egl.egl_s_sls_prd_f_m)\n"
            + "select 	g.id fk_prd_pgr, g.long_descr pgr_descr,\n"
            + "	sum(f.sales_optim_qty*f.price_optim) sales_optim,\n"
            + "	sum(f.sales_optim_qty*(f.price_optim-f.unitcost)) gprofit_optim,\n"
            + "	sum(f.sales_next_qty*f.price_optim) sales_next,\n"
            + "	sum(f.sales_next_qty*(f.price_next-f.unitcost)) gprofit_next\n"
            + "from g join p on g.id = p.fk_prd_pgr\n"
            + "left outer join f on p.id = f.fk_prd\n"
            + "group by g.id, g.long_descr\n"
            + "order by gprofit_optim";
}
