import { AllFixtures, Fixture } from "@/types";
import moment from "moment";
import { USE_SAMPLE } from "../dataSample/useSample";
import getFixturesSample from "../dataSample/getSampleFixtures";

const leagues = [
    { league: 39, name: 'EPL' },
    { league: 140, name: 'La Liga' },
    { league: 78, name: 'BundesLiga' },
    { league: 135, name: 'Serie A' },
    { league: 61, name: 'Ligue 1' },
    { league: 2, name: 'Champions League' },
    { league: 3, name: 'Europa League' },
    { league: 848, name: 'Conference League' },
    { league: 15, name: 'Fifa Club World Cup' },
    { league: 45, name: 'FA Cup' },
]

const API_KEY : string = process.env.API_KEY as string

export async function getFixturesById (year : number , id : number) : Promise<any> {
    const url = `https://api-football-beta.p.rapidapi.com/fixtures?season=${year}&league=${id}`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
    
        const fixtures: Fixture[] = data.response;
        if (fixtures === null || fixtures === undefined) {
        //   console.log("this is the output: ", fixtures);
          return [];
        } else {
        //   console.log('this is the output: ', fixtures);
          return fixtures;
        }
      } catch (error) {
        // console.error('Error fetching fixtures:', error);
        return [];
      
        }
    
}

export default async function getFixtures(): Promise<AllFixtures[]> {

    if (USE_SAMPLE) {
        return getFixturesSample();
    }

    try {
        const currentTime = moment();
        const year = currentTime.year();
        const month = currentTime.month();

        const allFixturesByLeague: AllFixtures[] = [];

        for (const league of leagues) {
            if (month <= 5) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await getFixturesById(year - 1, league.league),
                });
            } else if (month >= 8) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await getFixturesById(year, league.league)
                });
            } else {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await getFixturesById(year - 1, league.league)
                });
                const existingData = allFixturesByLeague.find((data) => data.name === league.name);
                if (existingData) {
                    existingData.fixtures.push(...(await getFixturesById(year, league.league)));
                } else {
                    allFixturesByLeague.push({
                        name: league.name,
                        fixtures: await getFixturesById(year, league.league)
                    });
                }
            }
        }


        return allFixturesByLeague;
    } catch (error) {
        console.error("An error occured while fetching fixtures: ", error);
        throw error;
    }
}