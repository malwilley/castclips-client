const formatMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)

  return `${minutes} minutes`
}

export default formatMinutes
