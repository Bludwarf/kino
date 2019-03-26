import {Benevole} from "../benevole/benevole.model";
import {StringUtils} from "../common/string-utils";
import * as moment from "moment";
import {Film} from "../film/film.model";
import {WithDate} from "../common/with-date";

moment.locale('fr');

export class SeanceInstance extends WithDate {

  /** le film projeté */
  public film?: Film;

  /** tous les bénévoles chargés d'assurer cette séance */
  public benevoles?: SeanceInstance.Benevoles = {};

  constructor(date: Date) {
    super(date);
  }
}

export module SeanceInstance {

  /**
   * Tous les bénévoles chargés d'assurer cette séance
   */
  export class Benevoles {
    projection?: Benevole;
    caisse?: Benevole;
    accueil?: Benevole;
  }

}
