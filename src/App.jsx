import { useEffect, useState } from 'react'
import Pokemon from './components/Pokemon'

export default function App () {
  const [user, setUser] = useState(null)
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('/users/ryctabo')
      .then((res) => res.json())
      .then(
        (body) => {
          console.log(body)
          setUser(body)
        },
        (err) => console.error(err)
      )
  }, [])

  useEffect(() => {
    fetch('/pokemon')
      .then((res) => res.json())
      .then(
        (body) => {
          setPokemons(body)
        },
        (err) => console.error(err)
      )
  }, [])

  const handleOnRemove = (pokemonName) => {
    if (user !== null) {
      const data = { userId: user.id, pokemon: pokemonName }
      fetch('users/favorites', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then(
          (body) => {
            setUser(body)
          },
          (err) => console.error(err)
        )
    }
  }

  const handleOnAdd = () => {
    if (user !== null) {
      const $selector = document.getElementById('pokemonSelector')
      const pokemonName = $selector.value
      const data = { userId: user.id, pokemon: pokemonName }
      fetch('users/favorites', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then(
          (body) => {
            setUser(body)
            $selector.value = undefined
          },
          (err) => console.error(err)
        )
    }
  }

  return (
    <>
      <header className='text-center py-4'>
        <h1 className='text-4xl font-bold'>
          Hi {user?.username ?? 'john.doe'}!
        </h1>
        <p className='text-sky-600'>{user?.email}</p>
      </header>

      <section className='text-center p-4'>
        <p>Select a pokemon for your favorites list:</p>
        <div className='flex flex-wrap gap-2 justify-center items-center mt-2'>
          <select
            id='pokemonSelector'
            name='pokemonSelector'
            className='px-4 py-1 bg-white rounded outline-dashed outline-2 outline-gray-600'
          >
            {
              pokemons.map(({ name }) => {
                return (
                  <option
                    key={name}
                    value={name}
                    disabled={user !== null && user.favorites.find(p => p.name === name)}
                  >
                    {name}
                  </option>
                )
              })
            }
          </select>
          <button
            className={`
              bg-sky-500 text-white uppercase rounded px-4 py-1 font-bold shadow-none
              hover:scale-[1.1] hover:shadow-md transition-all
            `}
            onClick={handleOnAdd}
          >
            Add
          </button>
        </div>
      </section>

      <section className='text-center p-4'>
        <h2 className='text-2xl font-medium'>
          Favorite Pokemons
        </h2>
        <p>
          Hey, my name is {user?.displayName} and there are my favorite pokemons:
        </p>
        <div className='flex flex-wrap justify-center items-center gap-3 mt-4'>
          {
            user?.favorites.map(p => {
              return (
                <Pokemon
                  key={p.id}
                  imageSrc={p.imageUrl}
                  name={p.name}
                  types={p.types}
                  onRemove={handleOnRemove}
                />
              )
            })
          }
          {
            !user?.favorites?.length &&
              <div className='text-6xl text-gray-200 font-bold select-none'>
                none
              </div>
          }
        </div>
      </section>
    </>
  )
}
