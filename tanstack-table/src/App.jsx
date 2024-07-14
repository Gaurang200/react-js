import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TanStackTable from './Components/TanStackTable'
import movieData from './MOVIE_DATA.json'

function App() {
  const [count, setCount] = useState(0)

  const movieColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Genre',
      accessorKey: 'genre',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
    },
  ]

  return (
    <>
    <div>
      <TanStackTable columns={movieColumns} data={movieData}  />
    </div>
    </>
  )
}

export default App
