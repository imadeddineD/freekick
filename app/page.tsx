import { AllFixtures, Standing } from "@/types"
import getStandings from "./getData/getStandings"
import StandingsAndFixtures from "./components/home/StandingsAndFixtures"
import getFixtures, { getFixturesById } from "./getData/getFixtures"
import getFixturesForFiveLeagues from "./getData/getFixturesForFiveLeagues"


export default async function Home() {
  const standings : Standing[] = await getStandings()

  const filteredFixtures : AllFixtures[] = await getFixturesForFiveLeagues()
  
  return (
    <div className='flex flex-col w-full justify-center items-center md:p-10'>
        <StandingsAndFixtures
        standings={standings} 
        filteredFixtures={filteredFixtures}
        />
    </div>
  )
}
