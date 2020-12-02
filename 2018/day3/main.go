package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {

	fileHandle, _ := os.Open("claims.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var claims []*Claim

	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		c := fileScanner.Text()
		regex := *regexp.MustCompile(`\#([0-9]*) \@ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)`)
		matches := regex.FindStringSubmatch(c)
		claim := &Claim{}
		claim.ID, _ = strconv.Atoi(matches[1])
		claim.Left, _ = strconv.Atoi(matches[2])
		claim.Top, _ = strconv.Atoi(matches[3])
		claim.Width, _ = strconv.Atoi(matches[4])
		claim.Height, _ = strconv.Atoi(matches[5])

		claims = append(claims, claim)
	}

	fabric := make([][]int, 1000)
	for i := 0; i < 1000; i++ {
		innerLen := 1000
		fabric[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			fabric[i][j] = 0
		}
	}

	for _, c := range claims {
		for h := 0; h < c.Height; h++ {
			for w := 0; w < c.Width; w++ {
				fabric[h+c.Top][w+c.Left]++
			}
		}
	}
	totalOverlap := 0
	for _, row := range fabric {
		for _, column := range row {
			if column > 1 {
				totalOverlap++
			}
		}
	}

	fmt.Printf("\n\nOverlap: %d", totalOverlap)

	for _, c := range claims {
		noOverlap := true
		for h := 0; h < c.Height; h++ {
			for w := 0; w < c.Width; w++ {
				if fabric[h+c.Top][w+c.Left] > 1 {
					noOverlap = false
				}
			}
		}
		if noOverlap == true {
			fmt.Printf("\n\nNo overlap: %d", c.ID)
		}
	}
}

type Claim struct {
	ID     int
	Left   int
	Top    int
	Width  int
	Height int
}
