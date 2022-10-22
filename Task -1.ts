/*=================================================================Task1======================================================================= */
interface ResourceBase {
    id: number
    name: string
    url: string
    created: string
  }
  
  interface CharacterLocation {
    name: string
    url: string
  }
  
  interface Character extends ResourceBase {
      status: 'Dead' | 'Alive' | 'unknown'
      species: string
      type: string
      gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
      origin: CharacterLocation
      location: CharacterLocation
      image: string
      episode: string[]
  }
  
  interface Episode extends ResourceBase {
      air_date: string
      episode: string
      characters: string[] | Array<Character>
  }
  
  interface EpisodePageInfo {
      count: number
      pages: number
      next: string
      prev: string
  }
  
  interface EpisodePage {
      info: EpisodePageInfo
      results: Array<Episode>
  }
  
  const BASE_URL = 'https://rickandmortyapi.com/api/'
  
  const getCharacter = async (url: string) => {
      return await fetch(url).then(raw => raw.json())
  }
  
  const getEpisodePage = async (url: string) => {
      const episodePage: EpisodePage = await fetch(url).then(raw => raw.json())
      const episodes = episodePage.results;
  
      for (let i = 0; i < episodes.length; i++) {
          const charactersByUrl: string[] = (episodes[i].characters) as string[]
          const characters: Array<Character> = await Promise.all(charactersByUrl.map(async (url: string) => {
              const character: Character = await getCharacter(url)
              return character;
          }))
          episodes[i].characters = characters
      }
      
      return episodePage;
  }
  
  const getAll = async () => {
      let epsiodeURL = BASE_URL + 'episode';
      
      while(true) {
          const episodePage: EpisodePage = await getEpisodePage(epsiodeURL);
          const {info, results} = episodePage;
  
          console.log(info)
  
          epsiodeURL = info.next
  
          results.map((episode: Episode) => {
              console.log(episode)
          })
  
          if (!info.next) 
              break;
      }
  }
  
  getAll()