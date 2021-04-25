// window.languagePluginUrl = "./pyodide";
import loadDynamicScript, { pyLanguageDefinition } from "../utils/loadDynamicScript";

export const initPyodide = (callback) => {
    loadDynamicScript(pyLanguageDefinition)
        .then(e => {
            (window.languagePluginLoader || new Promise(() => { })).then(() => {
                // pyodide is now ready to use...
                return window.pyodide.loadPackage('pandas')
            }).then(() => {
                return window.pyodide.loadPackage('numpy')
            }).then(() => {
                return window.pyodide.loadPackage('micropip')
            }).then(() => {
                return window.pyodide.runPython(`
                    import micropip
                    micropip.install('numpy-financial')
                `);
            }).then(() => {
                return window.pyodide.runPython(`
                    import numpy as np
                    import pandas as pd
                    import numpy_financial as npf

                    def unit_metrics(
                        rent_per_gfa,
                        unit_yield,
                        unit_gfa,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        """
                        Series of output to match unit yield region style:
                        User Input :rent_per_sqft, total yield, unit_sqft,
                        
                        Output Displace in 1D List:
                        Rent per Sqft
                        Yield
                        Total Sqft
                        Total Rent per unit
                        Total Rent
                        CF - Total Rent per month
                        """
                        rent_per_gfa_pd     = pd.Series(index=['Rent per GFA'], data = rent_per_gfa).values.tolist()
                        unit_yield_pd       = pd.Series(index=['Unit Yield'], data = unit_yield).values.tolist()
                        total_gfa_pd        = pd.Series(index=['Total GFA'], data = unit_yield * unit_gfa).values.tolist()
                        rent_unit_pd        = pd.Series(index=['Rent per Unit'], data = rent_per_gfa * unit_gfa).values.tolist()
                        monthly_rent_pd     = pd.Series(index=['Monthly Rent'], data = unit_yield * unit_gfa * rent_per_gfa).values.tolist()

                        global_date_range       = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series  = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = monthly_rent_pd[0])
                        undistribution_series     = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)
                        
                        #cashflow series
                        cashflow_series         = distribution_series.combine_first(undistribution_series)
                        cashflow_series         = cashflow_series.fillna(0)
                        
                        #SUM
                        sum_cashflow   = pd.Series(index = ['Grand Total'], data = cashflow_series.sum())
                        f_cashflow_series  = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = rent_per_gfa_pd + unit_yield_pd + total_gfa_pd + rent_unit_pd + monthly_rent_pd
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series ]

                        return round_output_series

                    def summary_unit_metrics(*UnitType):
                        """
                        Series of output to match unit yield region style
                        
                        This is to summarize the category of yield in the following calc: 
                        Rent per GFA (AVERAGE)
                        Yield (SUM)
                        Total GFA (SUM)
                        Total Rent per unit (AVERAGE)
                        Monthly Rental Income (SUM)
                        CF - SUM (SUM)
                        """
                        summary = [sum(i) for i in zip(*UnitType)]
                        
                        avr_rent_sqft = summary[0] / len(UnitType)
                        avr_rent_unit = summary[3] / len(UnitType)
                        
                        summary[0] = avr_rent_sqft
                        summary[3] = avr_rent_unit
                        
                        round_summary = [ round(elem, 0) for elem in summary ]
                        
                        return round_summary

                    def Net_Sales_Proceeds(
                        gross_sales_revenue,
                        selling_costs_total):
                        
                        #formula
                        net_sales_proceeds = gross_sales_revenue + selling_costs_total
                        
                        return net_sales_proceeds

                    def Total_Costs_incl_NOI(
                        net_operating_cf: float,
                        total_hard_cost: float,
                        total_parking_cost: float,
                        total_soft_costs_excl_property_tax: float):

                        #formula 
                        total_costs_incl_NOI = net_operating_cf + total_hard_cost + total_parking_cost + total_soft_costs_excl_property_tax
                        
                        return total_costs_incl_NOI

                    def Profit_Before_Land(
                        Net_Sales_Proceeds,
                        Total_Costs_incl_NOI,
                        Property_Tax):

                        #formula
                        profit_b_land = Net_Sales_Proceeds + Total_Costs_incl_NOI + Property_Tax

                        return profit_b_land

                    def Net_Profit(
                        Profit_Before_Land,
                        Land):

                        #formula
                        net_profit = Profit_Before_Land + Land
                        
                        return net_profit

                    def RLV_MoC(
                        Net_Sales_Proceeds,
                        Unescalated_MoC,
                        Total_Costs_incl_NOI,
                        Property_Tax):

                        #formula
                        rlv_moc = -(Net_Sales_Proceeds / (1 + Unescalated_MoC) + Total_Costs_incl_NOI + Property_Tax)

                        return rlv_moc

                    def RLV_Unit(
                        RLV,
                        Total_units):

                        #formula
                        rlv_u = RLV / Total_units

                        return rlv_u

                    def MoC(
                        Net_Profit,
                        Total_Costs_incl_NOI,
                        Property_Tax,
                        RLV_MoC):

                        #formula
                        moc = -Net_Profit / (Total_Costs_incl_NOI + Property_Tax + RLV_MoC)

                        return moc

                    def YoC(
                        NOI_at_Stabilization,
                        Total_Costs_incl_NOI,
                        Property_Tax):

                        #formula
                        yoc = -NOI_at_Stabilization / (Total_Costs_incl_NOI + Property_Tax + RLV_YoC)

                        return yoc

                    def Property_Tax_OPEX(
                        Effective_Gross_Revenue,
                        Controllable_OPEX,
                        Insurance_OPEX,
                        Mgmt_Fee,
                        Capital_Repair_Replacement_Reserve_CAPEX,
                        Assessed_Value, CAP_Rate):

                        #formula
                        property_tax_opex = ((Effective_Gross_Revenue + Controllable_OPEX + Insurance_OPEX + Mgmt_Fee_OPEX + Capital_Repair_Replacement_Reserve_CAPEX) / (Assessed_Value + CAP_Rate) * Assessed_Value)
                        
                        return property_tax_opex

                    def Gross_Sales_Revenue(
                        Operating_Cash_Flow,
                        CAP_Rate,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        #formula
                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')
                        
                        #determine the distribution dates and apply the amount 
                        distribution_series = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = 0)
                        distribution_series[-1] = Operating_Cash_Flow / CAP_Rate
                        distribution_series
                        undistribution_series = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)
                        
                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)


                        sum_cashflow = pd.Series(index = ['Grand Total'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)
                        
                        round_output_series = [ round(elem, 0) for elem in f_cashflow_series ]
                        
                        return round_output_series

                    def Selling_Cost(
                        Gross_Sales_Revenue,
                        Perct,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):
                        
                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')
                        
                        distribution_series = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = 0)
                        distribution_series[-1] = -Gross_Sales_Revenue * Perct
                        undistribution_series = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)
                        
                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)
                        sum_cashflow = pd.Series(index = ['Grand Total'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)
                        
                        round_output_series = [ round(elem, 0) for elem in f_cashflow_series ]
                        
                        return round_output_series

                    def SUM_list(*metrics):
                
                        """
                        Sum of any list
                        """
                        
                        res_list = [sum(i) for i in zip(*metrics)] 
                        round_output_series = [ round(elem, 0) for elem in res_list ]
                        return round_output_series

                    def Cashflow_by_Annual(
                        annual_amount,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        """
                        This cashflow function will divide the annual amount by 12, and distribute across the stated cashflow distribution start and end date.
                        """
                        annual_input            = pd.Series(index = ['Annual Input'], data = annual_amount).values.tolist()
                        monthly_distribution    = pd.Series(index = ['Monthly Distribution'], data = annual_amount / 12).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = monthly_distribution[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = annual_input
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series

                    def Cashflow_by_Perctage(
                        percentage,
                        of_amount,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        """
                        This function is for the metric that take a portion / percentage of another metric in the workbook.
                        And, distribute across the stated cashflow distribution start and end date.
                        """

                        dist_amount = pd.Series(index=['Distribution Amount'], data = percentage * of_amount).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = dist_amount[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = dist_amount
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series

                    def Cashflow_by_Month(
                        monthly_value,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        monthly = pd.Series(index=['Monthly'], data = monthly_value).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = monthly[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = monthly
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series

                    def Cashflow_by_LumpSum(
                        lumpsum,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        lump_sum_input = pd.Series(index = ['Lump Sum Input'], data = lumpsum).values.tolist()

                        no_months = (pd.to_datetime(cf_distribution_end_date).year - pd.to_datetime(cf_distribution_start_date).year) * 12 + pd.to_datetime(cf_distribution_end_date).month - pd.to_datetime(cf_distribution_start_date).month
                        
                        dist_amount = pd.Series(index = ['Distribution Amount'], data = lumpsum / no_months).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = dist_amount[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = lump_sum_input
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series

                    def Cashflow_by_Unit(
                        value_per_unit,
                        total_unit,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        value_input = pd.Series(index = ['Value per Unit'], data = value_per_unit).values.tolist()
                        dist_amount = pd.Series(index = ['Distribution Amount'], data = value_per_unit * total_unit).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = dist_amount[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = value_input
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series

                    def CAshflow_by_GFA(
                        value_per_GFA,
                        total_GFA,
                        global_start_date,
                        global_end_date,
                        cf_distribution_start_date,
                        cf_distribution_end_date):

                        value_input = pd.Series(index = ['Value per GFA'], data = value_per_GFA).values.tolist()
                        dist_amount = pd.Series(index = ['Distribution Amount'], data = value_per_GFA * total_GFA).values.tolist()

                        global_date_range        = pd.date_range(global_start_date, global_end_date, freq='M')
                        distribution_date_range  = pd.date_range(cf_distribution_start_date, cf_distribution_end_date, freq='M')

                        #determine the distribution dates and apply the amount 
                        distribution_series     = pd.Series(index = [y for y in global_date_range if y in distribution_date_range], data = dist_amount[0])
                        undistribution_series   = pd.Series(index = [y for y in global_date_range if y not in distribution_date_range], data = 0)

                        #cashflow series
                        cashflow_series = distribution_series.combine_first(undistribution_series)
                        cashflow_series = cashflow_series.fillna(0)

                        #SUM
                        sum_cashflow = pd.Series(index = ['SUM'], data = cashflow_series.sum())
                        f_cashflow_series = sum_cashflow.append(cashflow_series)

                        #output series
                        output_series = value_input
                        output_series.extend(f_cashflow_series.values.tolist())
                        round_output_series = [ round(elem, 0) for elem in output_series]

                        return round_output_series
                `)
            }).then(() => {
                if (callback) callback();
            });
        }).catch((e) => {
            if (callback) callback();
            console.error("Error initing CA");
        });
}

export function runPy(code, variables) {
    window.pyodide.runPython(`
        import sys
        import io
        import numpy.core.multiarray
        sys.stdout = io.StringIO()
    `);
    try {
        window.pyodide.runPython(`
            import numpy as np
            import pandas as pd
            import datetime
        `)


        window.pyodide.runPython(`
            import js
            def get_forest():
                return js.window.getForest();

            def set_flow(name, values):
                js.window.setFlow(name, values);

            def set_attr(name, value):
                js.window.setAttr(name, value);

            def get_flow(name):
                return js.window.getFlow(name);

            def get_children_flows(name):
                return js.window.getChildFlows(name);

            def get_attr(name):
                return js.window.getAttr(name);

        `)

        let defs = `kalamata_dict = {'_unused_': [1,2,3], `

        let scalars = ``;

        for (const variable in variables) {
            const simpleVarName = variable.substring(13)

            if (variables[variable].length > 1) {
                defs += `'${simpleVarName}': ${JSON.stringify(variables[variable])}, `
            } else if (isNaN(Number(variables[variable][0]))) {
                if (variables[variable][0] !== undefined) {
                    scalars += `kalamata['${simpleVarName}'] = ${JSON.stringify(variables[variable][0])}\n`
                }
            } else {
                if (isNaN(variables[variable][0])) {
                    scalars += `kalamata['${simpleVarName}'] = ${JSON.stringify(variables[variable][0])}\n`
                } else {
                    scalars += `kalamata['${simpleVarName}'] = ${JSON.stringify(Number(variables[variable][0]))}\n`
                }
            }
        }

        defs += `}
kalamata = dict([ (k,pd.Series(v)) for k,v in kalamata_dict.items() ])
workbook = kalamata
${scalars}
`
        try {
            window.pyodide.runPython(defs);
        } catch (e) {
            console.log(e)
        }


        let toRet = window.pyodide.runPython(code);

        if (toRet && toRet.isoformat && toRet.isoformat()) {
            console.log(toRet.isoformat());
            toRet = toRet.isoformat()
        }


        if (toRet && toRet[0] && toRet[0].isoformat && toRet[0].isoformat()) {
            toRet = toRet.map(v => v.isoformat())
        }

        return window.pyodide.runPython("sys.stdout.getvalue()") + JSON.stringify(toRet);
    } catch (e) {
        console.error(e)
        console.log(JSON.stringify(e.toString()))
        return JSON.stringify(e.toString());
    }
}