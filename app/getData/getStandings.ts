import 'server-only'

import { Standing } from '@/types'
import moment from 'moment'
import { USE_SAMPLE } from '../dataSample/useSample';
import getStandingsSample from '../dataSample/getSampleStandings';

const getStandings  = async () : Promise<Standing[]> => {
    if (USE_SAMPLE) {
        return getStandingsSample();
    }

    const currentTime = moment()
    const mounth = currentTime.month()
    let year ;
    if (mounth < 6) {
        year = currentTime.year() - 1
    } else {
        year = currentTime.year() 
    }

    const API_KEY : string = process.env.API_KEY as string

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
      };

    const standings: Standing[] = [];

    const leagues = [
        { name: 'EPL', id: 39 },
        { name: 'La Liga', id: 140 },
        { name: 'BundesLiga', id: 78 },
        { name: 'Serie A', id: 135 },
        { name: 'Ligue1', id: 61 }
    ]

    for (const league of leagues) {
        let url = `https://api-football-beta.p.rapidapi.com/standings?season=${year}&league=${league.id}`;
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const standing = data.response[0];
        
            if (standing) {
              standings.push(standing);
            }
        } catch (err) {
            console.error(`Error fetching ${league.name} standings: ${err}`);
        }

    }
    return standings;
}

export default getStandings