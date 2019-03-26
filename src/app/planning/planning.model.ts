import {SeanceInstance} from "../seance/seance-instance.model";
import * as moment from "moment";
import * as _ from "underscore";
import {WithDate} from "../common/with-date";
import {Benevole} from "../benevole/benevole.model";

/**
 * @return le nombre de caractères minimum à partir duquel les deux chaînes sont différentes, erreur si égales
 */
const prefixDiff = (s1: string, s2: string, startIndex = 0) => {
  const maxLength = Math.max(s1.length, s2.length);
  if (startIndex >= maxLength) {
    return startIndex;
  }
  for (let i = startIndex; i < maxLength; ++i) {
    if (s1[i] !== s2[i]) {
      return i + 1;
    }
  }
  throw new Error(`Aucune différence entre les deux chaînes "${s1}" et "${s2}"`);
};

export class Planning extends WithDate {

  private nomsUniques: Map<Benevole, string>;
  private benevolesCache: Benevole[];

  constructor(public seances: SeanceInstance[]) {
    super();
  }

  get id(): string {
    return moment(this.date).format('YYYY-MM-DD');
  }

  get titre(): string {
    return `Planning du ${moment(this.date).format('DD MMM YYYY')}`;
  }

  get date(): Date | undefined {
    return this.seances && this.seances.length ? this.seances[0].date : undefined;
  }

  getNomUnique(benevole: Benevole): string | undefined {
    if (!benevole) {
      return undefined;
    }
    if (!this.nomsUniques) {
      this.nomsUniques = new Map<Benevole, string>();
      const groups = _.groupBy(this.benevoles, 'prenom');
      for (let prenom in groups) {
        if (groups.hasOwnProperty(prenom)) {
          const memePrenoms = groups[prenom];
          if (memePrenoms.length > 1) {
            const nomsUniques = this.getNomsUniques(memePrenoms);
            nomsUniques.forEach(entry => this.nomsUniques.set(entry.benevole, entry.nomUnique));
          }
        }
      }
    }
    return this.nomsUniques.has(benevole) ? this.nomsUniques.get(benevole) : benevole.prenom;
  }

  getNomsUniques(benevoles: Benevole[]): NomUnique[] {
    if (benevoles.length <= 1) {
      throw new Error('Utilisation incorrecte : on attend au moins deux bénévoles');
    }

    // Recherche de la distance min qui sépare tous les noms complets
    let diff = prefixDiff(benevoles[0].nom, benevoles[1].nom);
    console.log('getNomsUniques', benevoles[0].nom, benevoles[1].nom, diff);
    for (let i = 2; i < benevoles.length; ++i) {
      let currentDiff = prefixDiff(benevoles[i].nom, benevoles[i-1].nom);
      diff = Math.max(diff, currentDiff);
      console.log('getNomsUniques', benevoles[i].nom, benevoles[i-1].nom, diff);
    }

    return benevoles.map(benevole => ({
      benevole: benevole,
      nomUnique: benevole.prenom + ' ' + benevole.nom.slice(0, diff)
    }));
  }

  get benevoles(): Benevole[] {
    if (!this.benevolesCache) {
      const benevoles: Set<Benevole> = new Set<Benevole>();
      this.seances.forEach(seance => {
        if (seance.benevoles.accueil) {
          benevoles.add(seance.benevoles.accueil);
        }
        if (seance.benevoles.caisse) {
          benevoles.add(seance.benevoles.caisse);
        }
        if (seance.benevoles.projection) {
          benevoles.add(seance.benevoles.projection);
        }
      });
      this.benevolesCache = Array.from(benevoles);
    }
    return this.benevolesCache;
  }

  push(seance: SeanceInstance): void {
    this.seances.push(seance);
    delete this.benevolesCache;
  }
}

interface NomUnique {
  benevole: Benevole;
  nomUnique: string;
}
