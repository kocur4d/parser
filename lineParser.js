const parseTime = time => {
  const [hour, minute] = time.split(':')
  return {
    hour,
    minute,
    asInt: parseInt(`${hour}${minute}`)
  }
}

const parseLine = line => {
  const [minute, hour, script] = line.split(' ')
  return {
    time: parseTime(`${hour}:${minute}`),
    script,
  }
}

const exactOutput = (time, parsedLine) => {
  if(time.asInt <= parsedLine.time.asInt)
    return `${parsedLine.time.hour}:${parsedLine.time.minute} today - ${parsedLine.script}`
  else
    return `${parsedLine.time.hour}:${parsedLine.time.minute} tomorrow - ${parsedLine.script}`
}

const anyOutput = (time, parsedLine) => {
  return `${time.hour}:${time.minute} today - ${parsedLine.script}`
}

const anyMinuteOutput = (time, parsedLine) => {
  if(parseInt(time.hour) <= parseInt(parsedLine.time.hour))
    if(time.hour !== parsedLine.time.hour)
      return `${parsedLine.time.hour}:00 today - ${parsedLine.script}`
    else
      return `${time.hour}:${time.minute} today - ${parsedLine.script}`
  else
    return `${parsedLine.time.hour}:00 tomorrow - ${parsedLine.script}`
}

const anyHourOutput = (time, parsedLine) => {
  if(parseInt(time.hour) === 23)
    if(parseInt(time.minute) > parseInt(parsedLine.time.minute)) 
      return `00:${parsedLine.time.minute} tomorrow - ${parsedLine.script}`
    else
      return `${time.hour}:${parsedLine.time.minute} today - ${parsedLine.script}`
  else
    if(parseInt(time.minute) > parseInt(parsedLine.time.minute)) 
      return `${parseInt(time.hour) + 1}:${parsedLine.time.minute} today - ${parsedLine.script}`
    else
      return `${time.hour}:${parsedLine.time.minute} today - ${parsedLine.script}`

}

const output = (time, parsedLine) => {
  // Branch to cover exact time match aka 40 2
  if(parsedLine.time.hour !== '*' && parsedLine.time.minute !== '*')
    return exactOutput(time, parsedLine)

  // Branch to cover any time match aka * * 
  if(parsedLine.time.hour === '*' && parsedLine.time.minute === '*')
    return anyOutput(time, parsedLine)
  
  // Branch to cover any minute match aka * 2 
  if(parsedLine.time.hour !== '*' && parsedLine.time.minute === '*')
    return anyMinuteOutput(time, parsedLine)
  
  // Branch to cover any hour match aka 40 * 
  if(parsedLine.time.hour === '*' && parsedLine.time.minute !== '*')
    return anyHourOutput(time, parsedLine)
}

module.exports = time => line => {
  return output(parseTime(time), parseLine(line))
}
