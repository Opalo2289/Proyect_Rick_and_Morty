export interface BaseData {
    id: number;
    name: string;
    url: string;
    created: string;
  }
  
  export interface Location extends BaseData {
    name: string
    type: string; // El tipo de la ubicación.
    dimension: string; // La dimensión en la que se encuentra la ubicación.
    residents: string[]; // Lista de URLs de personajes que fueron vistos por última vez en esta ubicación.
  }
  
  export interface Episode extends BaseData {
    name: string;
    air_date: string; // La fecha de emisión del episodio.
    episode: string; // El código del episodio.
    characters: string[]; // Lista de URLs de personajes que aparecieron en el episodio.
  }
  
  export interface Character extends BaseData {
    status: string; // El estado del personaje ('Vivo', 'Muerto' o 'desconocido').
    species: string; // La especie del personaje.
    type: string; // El tipo o subespecie del personaje.
    gender: string; // El género del personaje ('Femenino', 'Masculino', 'Sin género' o 'desconocido').
    origin: Location; // Nombre y enlace a la ubicación de origen del personaje.
    location: Location; // Nombre y enlace al punto final de la última ubicación conocida del personaje.
    image: string; // Enlace a la imagen del personaje. Todas las imágenes son de 300x300px y la mayoría son planos medios o retratos, ya que están destinadas a ser utilizadas como avatares.
    episode: string[]; // Lista de episodios en los que apareció este personaje.
  }