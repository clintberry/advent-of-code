package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"sort"
	"time"
)

func main() {

	fileHandle, _ := os.Open("guardevents.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var events []*Event

	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		regex := *regexp.MustCompile(`\[(.*)\] (.*)`)
		matches := regex.FindStringSubmatch(fileScanner.Text())
		e := &Event{}
		layout := "2006-01-02 15:04"

		e.Date, _ = time.Parse(layout, matches[1])
		e.Raw = matches[2]
		events = append(events, e)
	}

	sort.Slice(events, func(i, j int) bool {
		return events[i].Date.Before(events[j].Date)
	})

	// for _, e := range events {
	// 	fmt.Printf("%s %s\n", e.Date, e.Raw)
	// }

	var currentGuard int
	var startMinute int
	var action string
	guards := make(map[int]*Guard)

	for _, e := range events {
		switch e.Raw[0] {
		case 'G':
			fmt.Sscanf(e.Raw, "%s #%d", &action, &currentGuard)
		case 'f':
			startMinute = e.Date.Minute()
		case 'w':
			if currentGuard != 0 {
				_, ok := guards[currentGuard]
				if !ok {
					guards[currentGuard] = &Guard{}
					guards[currentGuard].MinuteMap = make([]int, 60)
				}
				guards[currentGuard].TotalMinutes += (e.Date.Minute() - startMinute)
				for i := startMinute; i < e.Date.Minute(); i++ {
					guards[currentGuard].MinuteMap[i]++
				}
			}
		}
	}

	var maxGuard int
	var maxMinute int
	var maxSleep int
	for i, g := range guards {
		fmt.Printf("\n\n%d: %d\n", i, g.TotalMinutes)
		for m, v := range g.MinuteMap {
			fmt.Printf("%d: %d | ", m, v)
			if v > maxSleep {
				maxMinute = m
				maxSleep = v
				maxGuard = i
			}
		}
	}

	fmt.Printf("\n\n\n\nMax Guard: %d, max minute: %d, instances: %d", maxGuard, maxMinute, maxSleep)

}

type Event struct {
	Date time.Time
	Raw  string
}

type Guard struct {
	TotalMinutes int
	MinuteMap    []int
}
