package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {

	fileHandle, _ := os.Open("boxids.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var boxes []string

	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		boxes = append(boxes, fileScanner.Text())
	}

	for i, box := range boxes {
		for j := i + 1; j < len(boxes); j++ {
			diffs := 0
			for k := 0; k < len(box); k++ {
				if box[k] != boxes[j][k] {
					diffs++
				}
				if diffs > 1 {
					break
				}
			}
			if diffs == 1 {
				fmt.Println(box)
				fmt.Println(boxes[j])
			}
		}
	}
}
