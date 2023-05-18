export class ActivityData {
    constructor(startDate, endDate, fileName, stats) {
        this.startDate = startDate
        this.endDate = endDate 
        this.fileName = fileName
        this.stats = stats
    }
}

export class ActivityStats {
    constructor(name, totalTime, streak, bestStreak, timePerDay, bestDayString)
    {
        this.name = name
        this.totalTime = totalTime
        this.streak = streak 
        this.bestDayString = bestDayString
        this.bestStreak = bestStreak
        this.timePerDay = timePerDay 
    }
}

class ActivityEntry {
    constructor(label, length)
    {
        this.label = label
        this.length = length
    }
}

class ActivityDefinition {
    constructor (label, restDays) {
        this.restDays = restDays
        this.label = label
    }
}

class Day {
    constructor(date, activityLogs)
    {
        this.date = date 
        this.activityLogs = activityLogs 
    }

    getTime(activityName)
    {
        if (activityLogs[activityName])
        {
            return activityLogs[activityName]
        }
        return 0
    }
}

export const ParseActivities = (string) => {
    const lines = string.split('\n')

    const activity_defs = []

    lines.forEach((element) => {
        if (getLineType(element) == 'activity') {
            activity_defs.push(parseActivityDefinition(element))
        }
    });

    const days = ParseDays(lines)

    const activities = []

    activity_defs.forEach(element => {
        activities.push(ParseActivity(element, days))
    })

    activities.sort((a, b) => a.totalTime - b.totalTime)

    return activities
}

const ParseActivity = (activity_def, days) => {

}

const activityPattern = /.*/
const dayPattern = /.*/
const entryPattern = /.*/

const parseActivityDefinition = (string) => {

}

const getLineType = (string) => {
    if (entryPattern.test(string)) {
        return 'entry'
    }
    if (activityPattern.test(string)) {
        return 'activity'
    }
    if (dayPattern.test(string)) { 
        return 'day'
    }

    return 'unknown'
}

const ComputeStreak = (element, days) => {

}

const ParseDays = (stringArray) => {

}

const removeWhitespace = (string) => {
    let result = ""
    for (let i = 0; i < string.length; i++){
        const char = string[i]
        if (char != ' ' && string[i] != '\t' && string[i] != '\n' && string[i] != '\r' && string[i] != '\f') {
            result += char
        }
    }

    return result 
}

function getAllMatches(regex, string) {
  let matches = [];
  let match;

  while ((match = regex.exec(string)) !== null) {
    matches.push(match[0]);
  }

  return matches;
}

export const ParseActivityEntry = (string) => {
    if (getLineType(string) != 'entry') {
        console.log('line type was ' + getLineType(string) + ', returning')
        return null; 
    }

    string = string.trim()

    // example: 10:16 AM - 10:30 AM, gamedev // with comment 

    // match start time, end time 
    // match name 

    const timePattern = /[0-9][0-9]:[0-9][0-9][ \t]*[APap][ \t]*[Mm]/g

    let times = getAllMatches(timePattern, string)

    if (times == null || times.length != 2) {
        console.log('times was null or did not have the correct length! Times was ' + JSON.stringify(times))
        return null 
    }

    const t1 = removeWhitespace(times[0]).toLowerCase()
    const t2 = removeWhitespace(times[1]).toLowerCase()

    // now we should have a string of the form [H]H:MM[am][pm]

    const m1 = findMeridian(t1)

    if (m1 == null){
        console.log('Could not find meridian from string ' + t1)
    }

    const day1 = parseTime(t1, 'am')
    const day2 = parseTime(t2, m1) // needs to know the meridian of the first time to see if it wraps around 

    if (!day1 || !day2) {
        console.log('could not parse day1 or day2!')
    }

    const length = (Number(day2) - Number(day1)) / (1000 * 60 * 60)

    const labelPattern = /,(.*?)(\/\/|$)/

    const labelmatch = labelPattern.exec(string)
    if (labelmatch == null || labelmatch.length < 2)
    {
        console.log('could not match label! label was ' + JSON.stringify(labelmatch))
        return null
    }

    // skip comma, use the 2nd match
    const label = labelmatch[1].trim()

    return new ActivityEntry(label, length)
}

const parseTime = (string, prev_meridian) => {
    const numPattern = /\d+/g

    const numbers = getAllMatches(numPattern, string)

    if (numbers == null || numbers.length != 2) {
        return null
    }

    const meridian = findMeridian(string)

    let day = 15
    if (prev_meridian == 'pm' && meridian == 'am') {
        day = 16
    }

    return new Date(2020, 9, day, parseInt(numbers[0]), parseInt(numbers[1]), 0, 0)
}

const findMeridian = (string) => {
    const meridianPattern = /[ap]m/
    const merid_exec = meridianPattern.exec(string)

    if (merid_exec == null || merid_exec.length != 1) {
        return null
    }
    
    const meridian = merid_exec[0]

    return meridian
}