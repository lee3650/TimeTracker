export class Activity {
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

export class ActivityEntry {
    constructor(label, length)
    {
        this.label = label
        this.length = length
    }
}

export class Day {
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
    
}

export const ComputeString = (days) => {

}

export const ParseDays = (string) => {

}

export const ParseActivityEntry = (string) => {

}

export const ParseDay = (string) => {

}
