const fs = require('fs')
import { ParseActivities, ParseActivityEntry } from "./data";

test('activity entries are parsed correctly', () => {
    const input = "11:10 AM - 11:40 AM, time tracker project // fixing the mockup\n"

    const activityEntry = ParseActivityEntry(input)

    expect(activityEntry.length).toBeCloseTo(0.5)
    expect(activityEntry.label).toBe('time tracker project')
})

test('activity entry length is correct with wraparound', () => {
    const input = "11:30 AM - 12:30 PM, gamedev\n"

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

    expect(reading.name).toBe('gamedev')
    expect(reading.totalTime).toBeCloseTo(1.5)
    expect(reading.streak).toBe(2)
})
