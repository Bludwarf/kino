import * as moment from "moment";
import {StringUtils} from "./string-utils";

export class WithDate {
  public date: Date;

  constructor(date?: Date) {
    if (date) {
      this.date = date;
    }
  }

  // TODO Optionnal getters : https://github.com/Microsoft/TypeScript/issues/14417
  get jourSemaine(): string {
    return moment(this.date).format('dddd');
  }

  // TODO Optionnal getters : https://github.com/Microsoft/TypeScript/issues/14417
  get jourNum(): number {
    return this.date.getDate();
  }

  // TODO Optionnal getters : https://github.com/Microsoft/TypeScript/issues/14417
  get heure(): string {
    return `${StringUtils.pad2(this.date.getHours())}h${this.date.getMinutes() ? StringUtils.pad2(this.date.getMinutes()): ''}`;
  }

  memeJour(date: Date): boolean {
    return moment(this.date).isSame(date, 'day');
  }
}
