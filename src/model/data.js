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
        if (this.activityLogs[activityName])
        {
            return this.activityLogs[activityName]
        }
        return 0
    }

    getDay() {
        return this.date.getDay() 
    }
}

export const ParseActivityData = (string, filename) => {
    const startDay = FindFirstDate(string)
    const endDay = FindLastDate(string) 

    const stats = ParseActivities(string)

    return new ActivityData(formatDate(startDay), formatDate(endDay), filename, stats)
}

export const ParseActivities = (string) => {
    const lines = string.split('\n')

    const activity_defs = []

    lines.forEach((element) => {
        if (getLineType(element) === 'activity') {
            activity_defs.push(parseActivityDefinition(element))
        }
    });

    // days = array of type day 
    const days = ParseDays(lines)

    console.log('Parsed activity definitions: ' + JSON.stringify(activity_defs))
    console.log('parsed days: ' + JSON.stringify(days))

    const activities = []

    activity_defs.forEach(element => {
        const parsedAct = ParseActivity(element, days)
        activities.push(parsedAct)
    })

    activities.sort((a, b) => b.totalTime - a.totalTime)

    console.log('Final activities: ' + JSON.stringify(activities))

    return activities
}

export const FindFirstDate = (string) => {
    const lines = string.split('\n')

    let lastDayStr = ""

    lines.forEach(el => {
        if (getLineType(el) === 'day') {
            lastDayStr = el
        }
    })

    if (lastDayStr === "") {
        return null 
    }

    // first day should be the last day we find 
    return ParseDay(lastDayStr)
}

export const FindLastDate = (string) => {
    const lines = string.split('\n')

    for (let i = 0; i < lines.length; i++) {
        if (getLineType(lines[i]) === 'day') {
            return ParseDay(lines[i])
        }
    }

    return null
}

const ParseDay = (string) => {
    string = removeWhitespace(string)

    console.log('parsing day: ' + string)

    const datePattern = /(\d\d\d\d)(\/)(\d\d)(\/)(\d\d)/
    // year = match 0 
    // month = match 1
    // day = match 2

    const matches = datePattern.exec(string)

    console.log('day matches: ' + JSON.stringify(matches))

    if (matches.length < 6) {
        return null
    }

    const year = Number(matches[1]) 
    const month = Number(matches[3]) 
    const day = Number(matches[5]) 

    return new Date(year, month, day)
}

const ParseActivity = (activity_def, days) => {
    // so, we have all the Day objects and the given activity definition 
    // so this should be fairly easy 
    // result: constructor(name, totalTime, streak, bestStreak, timePerDay, bestDayString)
    // day: constructor(date, activityLogs)
    // activity def: label, restDays : int[] 
    // constructor (label, restDays) 

    // we also have ComputeStreak() 

    if (days.length === 0) {
        return new ActivityStats(activity_def.label, 0, 0, 0, 0, 'n/a')
    }

    let totalTime = 0

    let bestDay = 0
    let bestDayIndex = -1

    for (let i = days.length - 1; i >= 0; i--) {
        const curTime = days[i].getTime(activity_def.label.toLowerCase())

        totalTime += curTime

        if (curTime > bestDay) {
            bestDay = curTime
            bestDayIndex = i
        }
    }

    const timePerDay = totalTime / days.length 
    let bestDayStr = 'n/a'

    if (bestDayIndex >= 0) {
        bestDayStr = formatDate(days[bestDayIndex].date)
    }

    const curStreak = ComputeStreak(activity_def.label, activity_def.restDays, days)
    const bestStreak = ComputeBestStreak(activity_def.label, activity_def.restDays, days)

    return new ActivityStats(activity_def.label, Number(totalTime).toFixed(2), curStreak, bestStreak, timePerDay, bestDayStr)
}

const formatDate = (date) => {
    if (date === null) {
        return ''
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate 
}

const activityPattern = /[Aa]ctivity:.*/
const dayPattern = /###\d\d\d\d\/\d\d\/\d\d/
const entryPattern = /\d\d?:\d\d[AaPp][Mm].*/

const removeComment = (string) => {
    const comment = string.indexOf("//")
    if (comment >= 0) {
        string = string.slice(0, comment)
    }
    return string 
}

const removeExtraWhiteSpace = (string) => {
    let result = ''
    let prevWhite = true
    for (let i = 0; i < string.length; i++) {
        const whitespace = !notWhitespace(string[i])

        if (notWhitespace(string[i]) || !prevWhite) { 
            result += string[i]
        } 
        prevWhite = whitespace 
    }

    return result.trim()
}

export const parseActivityDefinition = (string) => {
    string = removeComment(string)
    string = removeExtraWhiteSpace(string)

    const activityNamePattern = /([Aa]ctivity:)([^\n;]*)/

    const matches = activityNamePattern.exec(string)

    console.log('activity def matches: ' + JSON.stringify(matches))

    if (matches.length < 2) {
        return null 
    }

    // 2nd submatch 
    const name = removeExtraWhiteSpace(matches[2]) 
    string = string.toLowerCase()
    string = removeWhitespace(string)
    const restStart = string.indexOf('restdays:')

    if (restStart < 0)
    {
        console.log('rest start was less than zero for string ' + string)
        return new ActivityDefinition(name, [])
    }

    string = string.slice(restStart + 9)
    const dayToInt = {
        'mon': 0, 
        'tues': 1, 
        'tue': 1, 
        'wed': 2, 
        'thurs': 3, 
        'thur': 3, 
        'fri': 4, 
        'sat': 5, 
        'sun': 6, 
    }

    const dayMatch = /[^,\n]+/

    console.log('finding all matches for string ' + string)

    const dayStrs = getAllMatches(dayMatch, string, true)

    console.log('rest day matches: ' + JSON.stringify(dayStrs))

    const dayInts = dayStrs.map(v => dayToInt[v.trim()])

    return new ActivityDefinition(name, dayInts)
}

const getLineType = (string) => {
    string = removeWhitespace(string)

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

// days should be descending 
export const ComputeStreak = (string_label, rest_days, days) => {
    let streak = 0

    for (let i = 0; i < days.length; i++) {
        if (days[i].getTime(string_label) > 0) {
            streak++ 
        }
        else {
            if (i > 0 && !rest_days.includes(days[i].getDay())) {
                break 
            }
        }
    }

    return streak 
}

export const ComputeBestStreak = (string_label, rest_days, days) => {
    let streak = 0
    let bestStreak = 0

    for (let i = 0; i < days.length; i++) {
        if (days[i].getTime(string_label) > 0) {
            streak++ 
            if (streak > bestStreak) {
                bestStreak = streak
            }
        }
        else {
            if (rest_days.includes(days[i].getDay()))
            streak = 0 
        }
    }
}

const ParseDays = (stringArray) => {
    let curDay = null 
    let timesOnDay = {} 

    const days = [] 

    for (let i = 0; i < stringArray.length; i++) {
        if (getLineType(stringArray[i]) === 'day') {
            if (curDay !== null) {
                days.push(new Day(curDay, timesOnDay))
            }
            curDay = ParseDay(stringArray[i])
            if (curDay == null) {
            }
            timesOnDay = {} 
        }
        else if (getLineType(stringArray[i]) === 'entry') {
            const entry = ParseActivityEntry(stringArray[i])

            if (entry == null) {
                continue
            }

            const label = entry.label.toLowerCase()

            if (timesOnDay[label]) {
                timesOnDay[label] += entry.length
            }
            else {
                timesOnDay[label] = entry.length
            }
        }
    }

    if (curDay != null) {
        days.push(new Day(curDay, timesOnDay))
    }

    return days 
}

const notWhitespace = char => {
    return char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r' && char !== '\f'
}

const removeWhitespace = (string) => {
    let result = ""
    for (let i = 0; i < string.length; i++){
        const char = string[i]
        if (notWhitespace(char)) {
            result += char
        }
    }

    return result 
}

function getAllMatches(regex, string, withSubstr) {
  let matches = [];
  let match;

  while ((match = regex.exec(string)) !== null) {
    // console.log('adding match: ' + match[0] + ', with substring: ' + withSubstr)
    matches.push(match[0]);
    if (withSubstr) {
        string = string.substring(match.index + match[0].length);
    }
  }

  return matches;
}

export const ParseActivityEntry = (string) => {
    if (getLineType(string) !== 'entry') {
        console.log('line type was ' + getLineType(string) + ', returning')
        return null; 
    }

    string = removeExtraWhiteSpace(string)

    // example: 10:16 AM - 10:30 AM, gamedev // with comment 

    // match start time, end time 
    // match name 

    const timePattern = /[0-9]?[0-9]:[0-9][0-9][ \t]*[APap][ \t]*[Mm]/g

    let times = getAllMatches(timePattern, string, false)

    if (times === null || times.length !== 2) {
        console.log('times was null or did not have the correct length! Times was ' + JSON.stringify(times) + ' for input ' + string)
        return null 
    }

    const t1 = removeWhitespace(times[0]).toLowerCase()
    const t2 = removeWhitespace(times[1]).toLowerCase()

    // now we should have a string of the form [H]H:MM[am][pm]

    const m1 = findMeridian(t1)

    if (m1 === null){
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
    if (labelmatch === null || labelmatch.length < 2)
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

    const numbers = getAllMatches(numPattern, string, false)

    if (numbers === null || numbers.length !== 2) {
        return null
    }

    const meridian = findMeridian(string)

    let day = 15
    if (prev_meridian === 'pm' && meridian === 'am') {
        day = 16
    }

    return new Date(2020, 9, day, parseInt(numbers[0]), parseInt(numbers[1]), 0, 0)
}

const findMeridian = (string) => {
    const meridianPattern = /[ap]m/
    const merid_exec = meridianPattern.exec(string)

    if (merid_exec === null || merid_exec.length !== 1) {
        return null
    }
    
    const meridian = merid_exec[0]

    return meridian
}