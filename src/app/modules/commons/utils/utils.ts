/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: utils.ts
 *   Created at: 2023-05-29, 02:09:50
 *   Last updated at: 2023-08-30, 22:55:57
 *   Project name: stars-magnet-client
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { snakeCase } from 'lodash';
import { CompanyResDtoModel } from '~/app-public/models/company.model';

export class Utils {
  static convertCamelToSnake(convertedObj: any): any {
    if (convertedObj === null || typeof convertedObj !== 'object') {
      return convertedObj;
    }
    const result: any = {};
    for (const key in convertedObj) {
      if (Object.prototype.hasOwnProperty.call(convertedObj, key)) {
        const snakeCaseKey = snakeCase(key);
        result[snakeCaseKey] = this.convertCamelToSnake(convertedObj[key]);
      }
    }
    return result;
  }

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
  }

  static convertCompaniesDotsToCommas(
    result: CompanyResDtoModel[]
  ): CompanyResDtoModel[] {
    return result.map(comp => {
      comp.avgRatings = comp.avgRatings
        ? comp.avgRatings.toString().replaceAll('.', ',')
        : '?';
      return comp;
    });
  }

  static getGenericErr(err: any): string {
    return err.message || 'Unknow server error.';
  }

  static generateStarsStructure(avgRating: string): string[] {
    const grade = parseFloat(avgRating.replace(',', '.'));
    const starsArray = Array.from({ length: 10 }).fill('bi-star') as string[];
    for (let i = 1; i <= starsArray.length; i++) {
      if (grade < i && grade > i - 1) {
        starsArray[i - 1] += '-half';
      } else if (grade >= i) {
        starsArray[i - 1] += '-fill';
      }
    }
    return starsArray;
  }
}
