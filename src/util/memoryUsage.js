module.exports = () => {
  const used = process.memoryUsage();
  let total = 0;
  
  for (let key in used) {
    total += used[key]
  }
  return (Math.round(total / 1024 / 1024 * 100) / 100) + ' MB'
}