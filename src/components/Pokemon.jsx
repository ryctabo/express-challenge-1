export default function Pokemon ({ imageSrc, name, types, onRemove }) {
  const handleClick = () => {
    onRemove(name)
  }

  return (
    <div className='flex flex-col bg-white shadow-md rounded select-none text-center overflow-hidden w-32'>
      <div className='flex flex-col justify-center items-center p-4'>
        <img
          className='h-20'
          src={imageSrc}
          alt={name}
        />
        <p className='first-letter:uppercase font-medium'>{name}</p>
        <ul className='flex gap-1 [&>li]:text-xs [&>li]:bg-sky-500 [&>li]:text-sky-100 [&>li]:px-1 [&>li]:rounded'>
          {
            types.map((type) => (<li key={type}>{type}</li>))
          }
        </ul>
      </div>
      <button
        className={`
          text-sm bg-slate-300 text-slate-700 
          hover:bg-red-600 hover:text-red-100 transition-colors
        `}
        onClick={handleClick}
      >
        Remove
      </button>
    </div>
  )
}
