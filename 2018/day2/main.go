package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	fileHandle, _ := os.Open("boxids.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var boxes []string

	for fileScanner.Scan() {
		fmt.Println(fileScanner.Text())
		boxes = append(boxes, fileScanner.Text())
	}

	twice := 0
	thrice := 0

	for _, box := range boxes {
		for i := 0; i < len(box); i++ {
			c := strings.Count(box, string(box[i]))
			if c == 2 {
				fmt.Println("twice: " + box + " | " + string(box[i]))
				twice++
				break
			}
		}
		for i := 0; i < len(box); i++ {
			c := strings.Count(box, string(box[i]))
			if c == 3 {
				fmt.Println("thrice: " + box + " | " + string(box[i]))
				thrice++
				break
			}
		}
	}

	fmt.Printf("\n\n\nTwice: %d  Thrice: %d... checksum: %d", twice, thrice, twice*thrice)
}
