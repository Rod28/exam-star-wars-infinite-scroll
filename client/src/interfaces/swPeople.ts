export type SWgender = 'female' | 'male' | 'n/a' | 'none' | 'hermaphrodite';

export interface ResultsType {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: SWgender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface SWpeopleTypes {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsType[];
}
