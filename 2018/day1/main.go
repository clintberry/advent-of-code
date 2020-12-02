package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {

	fileHandle, _ := os.Open("sequence.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var sequence []int

	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		num, _ := strconv.Atoi(fileScanner.Text())
		sequence = append(sequence, num)
	}

	frequencyMap := make(map[int]bool)

	currentFreq := 0

	for {
		for _, n := range sequence {
			currentFreq += n
			fmt.Println(currentFreq)
			_, ok := frequencyMap[currentFreq]
			if ok {
				fmt.Printf("\n\n DUPLICATE FOUND AT %d", currentFreq)
				panic("woot")
			}
			frequencyMap[currentFreq] = true
		}
	}

}
