import {Planning} from "./planning.model";
import {SeanceInstance} from "../seance/seance-instance.model";
import {FILMS} from "../film/film.mock";
import {Film} from "../film/film.model";
import {BENEVOLES} from "../benevole/benevole.service.mock";
import {Benevole} from "../benevole/benevole.model";

export const createPlanning = (seances: SeanceInstance[]): Planning => {
  return new Planning(seances);
};

interface SeanceOpts {
  accueil?: Benevole;
  caisse?: Benevole;
  projection?: Benevole;
}

export const createSeanceAvecFilm = (date: string, film: Film, opts?: SeanceOpts): SeanceInstance => {
  const seance = new SeanceInstance(new Date(date));
  seance.film = film;
  if (opts) {
    if ('accueil' in opts) {
      seance.benevoles.accueil = opts.accueil;
    }
    if ('caisse' in opts) {
      seance.benevoles.caisse = opts.caisse;
    }
    if ('projection' in opts) {
      seance.benevoles.projection = opts.projection;
    }
  }
  return seance;
};

export const PLANNINGS: Planning[] = [
  createPlanning( [
    // mer 15h
    createSeanceAvecFilm('2019-04-03T15:00:00+0200', FILMS[2], {
      caisse: BENEVOLES[3]
    }),
    // mer 17h
    createSeanceAvecFilm('2019-04-03T17:00:00+0200', FILMS[2], {
      accueil: BENEVOLES[1],
    }),
    // jeu 20h30
    createSeanceAvecFilm('2019-04-04T20:30:00+0200', FILMS[1], {
      accueil: BENEVOLES[1],
      caisse: BENEVOLES[2]
    }),
    // ven 20h30
    createSeanceAvecFilm('2019-04-05T20:30:00+0200', FILMS[0], {
      accueil: BENEVOLES[1],
      caisse: BENEVOLES[2]
    }),
    // sam 21h
    createSeanceAvecFilm('2019-04-06T21:00:00+0200', FILMS[2], {
      accueil: BENEVOLES[1],
      caisse: BENEVOLES[4]
    }),
    // dim 15h
    createSeanceAvecFilm('2019-04-07T15:00:00+0200', FILMS[2], {
      accueil: BENEVOLES[1],
      caisse: BENEVOLES[5]
    })
  ]),
];
