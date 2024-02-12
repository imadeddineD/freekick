'use client'
import { Team } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const Searchbar = ({
    teams
} : {
    teams : Team[]
}) => {

    const [searchTerm , setSearchTerm] = useState('')
    const [focusedIndex , setFocusedIndex] = useState(-1)
    const [showFilteredTerm , setShowFilteredTerm] = useState(false)

    let router = useRouter()

    const handleSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setFocusedIndex(-1)
        setShowFilteredTerm(true)
    }

    const filteredTeams = teams.filter(team => team.team.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            let length = 0;
            if (filteredTeams.length > 10) {
                length = 10;
            } else {
                length = filteredTeams.length;
            }
            setFocusedIndex(prevIndex => (prevIndex < length - 1 ? prevIndex + 1 : prevIndex));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (event.key === 'Enter') {
            if (focusedIndex !== -1) {
                const teamId = filteredTeams[focusedIndex].team.id;
                router.push(`/team/${teamId}`);
                setSearchTerm('');
            }
        }
    }

    const handleTeamItemClick = () => {
        setSearchTerm('');
    }

    const teamListRef = useRef<HTMLDivElement>(null);



  return (
    <div className="flex justify-center items-center w-full max-w-lg relative">
        <input 
        placeholder='Search for teams...'
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-gradient-to-r from-neutral-100/60 to-black/25
        bg-transparent p-2 outline-none border-neutral-100/60 border-[1px]
        rounded-xl hover:border-blue-400 focus:border-blue-400
        focus:from-blue-400/60 text-neutral-100 placeholder:text-neutral-100/70"
        />
        {
                searchTerm && filteredTeams.length > 0 && showFilteredTerm  ? (
                    <div
                        ref={teamListRef}
                        className="absolute top-full left-2 w-full max-w-md bg-black/80
                        z-20 flex flex-col"
                    >
                        {filteredTeams.slice(0, 10).map((standing, i) => (
                            <Link
                                href={`/team/${standing.team.id}`}
                                key={standing.team.id}
                                className={`p-2 text-neutral-100 ${i === focusedIndex
                                    ? 'bg-neutral-100/40' : ''}`}
                                onClick={() => handleTeamItemClick()}
                            >
                                {standing.team.name}
                            </Link>
                        ))}

                    </div>
                ) : null
            }
    </div>
  )
}

export default Searchbar