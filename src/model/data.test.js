const fs = require('fs')
import { ParseActivities, ParseActivityEntry, parseActivityDefinition, FindLastDate} from "./data"

test('last date is found', () => {
    const input = fs.readFileSync('./src/model/test_log.md', 'utf-8')
    
    const output = FindLastDate(input)

    expect(output.getFullYear()).toBe(2023)
    expect(output.getMonth()).toBe(5)
    expect(output.getDate()).toBe(17)
})

test('activity entries are parsed correctly', () => {
    const input = "11:10 AM - 11:40 AM, time tracker project // fixing the mockup\n"

    const activityEntry = ParseActivityEntry(input)

    expect(activityEntry.length).toBeCloseTo(0.5)
    expect(activityEntry.label).toBe('time tracker project')
})

test.only('activity entries are parsed within PM', () => {
    const input = "12:15 PM - 5:15 PM, testing"

    const activityEntry = ParseActivityEntry(input) 

    expect(activityEntry.length).toBeCloseTo(5)
    expect(activityEntry.label).toBe('testing')
})

test.only('activity entries are parsed from AM to PM', () => {
    const input = "11:00 AM - 5:15 PM, testing"

    const activityEntry = ParseActivityEntry(input) 

    expect(activityEntry.length).toBeCloseTo(6.25)
    expect(activityEntry.label).toBe('testing')
})

test('can parse activity definition', () => {
    const input = "Activity: testing; Rest Days: Mon, Tues, Wed\n"

    const def = parseActivityDefinition(input)

    expect(def.label).toBe('testing')
    expect(def.restDays).toContain(0)
    expect(def.restDays).toContain(1)
    expect(def.restDays).toContain(2)

})

test.only('activity entry length is correct between days', () => {
    const input = '11:30 PM - 1:30 AM, gamedev\n'

    const entry = ParseActivityEntry(input)

    expect(entry.length).toBeCloseTo(2)
    expect(entry.label).toBe('gamedev')

}) 

test('activity entry length is correct with wraparound', () => {
    const input = "11:30 AM - 12:30 PM, gamedev\n"

    const entry = ParseActivityEntry(input)

    expect(entry.length).toBeCloseTo(1)
    expect(entry.label).toBe('gamedev')
})

test('activity entry is parsed with single digit times', () => {
    const input = "1:30 AM - 2:30 PM, gamedev\n"

    const entry = ParseActivityEntry(input)

    expect(entry.length).toBeCloseTo(1)
    expect(entry.label).toBe('gamedev')
})

test('activities are parsed correctly', () => {
    const input = fs.readFileSync('./src/model/test_log.md', 'utf-8')

    const output = ParseActivities(input)

    expect(output.length).toBe(3)

    // should be sorted by total time descending 
    const timetracker = output[0]

    expect(timetracker.name).toBe('time tracker project')
    expect(timetracker.totalTime).toBeCloseTo(4.75)
    expect(timetracker.streak).toBe(2)

    const gamedev = output[1]

    expect(gamedev.name).toBe('gamedev')
    expect(gamedev.totalTime).toBeCloseTo(1.5)
    expect(gamedev.streak).toBe(1)

    const reading = output[2]

    expect(reading.name).toBe('reading')
    expect(reading.totalTime).toBeCloseTo(1.25)
    expect(reading.streak).toBe(2)
})
