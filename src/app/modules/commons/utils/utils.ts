/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: utils.ts
 * Last modified: 24/05/2023, 03:47
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { snakeCase } from "lodash";
import { AlertType } from "./alert.type";

import { BehaviorSubject } from "rxjs";

import { IResponseAlertModel } from "../models/response-alert.model";
import { ICompanyResDtoModel } from "../../public/models/company.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Utils {

    static convertCamelToSnake(convertedObj: any): any {
        if (convertedObj === null || typeof convertedObj !== 'object') {
            return convertedObj;
        }
        const result: any = {};
        for (const key in convertedObj) {
            if (convertedObj.hasOwnProperty(key)) {
                const snakeCaseKey = snakeCase(key);
                result[snakeCaseKey] = this.convertCamelToSnake(convertedObj[key]);
            }
        }
        return result;
    };

    static getFirstObjectErrorValue(variable: any): any {
        if (typeof variable !== 'object' || variable === null) {
            return String(variable);
        }
        const keys = Object.keys(variable);
        if (keys.length < 1) return String(variable);

        const value = variable[keys[0]];
        if (value instanceof Array) {
            return value[0];
        }
        return value;
    };

    static convertCompaniesDotsToCommas(result: ICompanyResDtoModel[]): ICompanyResDtoModel[] {
        return result.map(comp => {
            comp.avgRatings = comp.avgRatings ? comp.avgRatings.toString().replaceAll(".", ",") : "-"
            return comp;
        });
    };

    static getGenericErr(err: any): string {
        return err.message || "Unknow server error.";
    };
}
