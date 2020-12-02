package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	fileHandle, _ := os.Open("polymer.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	var polymer string

	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		polymer = fileScanner.Text()
	}

	size := shrink(polymer)
	fmt.Println(size)

	for i := 65; i < 91; i++ {
		tempp := strings.Replace(polymer, string(i), "", -1)
		tempp = strings.Replace(tempp, string(i+32), "", -1)
		s := shrink(tempp)
		if s < size {
			size = s
		}
	}

	fmt.Println(size)
}

func shrink(polymer string) int {
	poly := []rune(polymer)

	change := true
	for change {

		//fmt.Println(len(poly))
		change = false
		for i := 0; i < len(poly)-1; i++ {
			diff := poly[i] - poly[i+1]
			if diff == 32 || diff == -32 {
				//fmt.Println(string(poly[i]), string(poly[i-1]))
				poly = append(poly[:i], poly[i+2:]...)
				change = true
				i--
			}
			//fmt.Println(diff)
		}
		//fmt.Println(len(poly))
	}
	//fmt.Println(string(poly))
	return (len(poly))
}
