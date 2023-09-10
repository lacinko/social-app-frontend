type Props = {
  size: string
}

function Logo({ size }: Props) {
  return (
    <div>
      <h1 className="uppercase tracking-widest font-bold text-center">
        Meditations
      </h1>
      <p className="tracking-tighter italic text-gray-500">
        “The soul becomes dyed with the colour of its thoughts.”
      </p>
    </div>
  )
}

export default Logo
