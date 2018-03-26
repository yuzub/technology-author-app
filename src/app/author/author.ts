export interface Author {
  $key: string;
  name: string;
  authorTechs: {[key: string] : {name: string}};
  link?: string;
  photoUrl?: string;
}
