package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {

	fileHandle, _ := os.Open("xy.txt")
	defer fileHandle.Close()
	fileScanner := bufio.NewScanner(fileHandle)

	coords := make(map[int]([]int))
	var maxy, maxx, miny, minx int

	i := 1
	for fileScanner.Scan() {
		//fmt.Println(fileScanner.Text())
		var x, y int
		fmt.Sscanf(fileScanner.Text(), "%d, %d", &x, &y)
		//fmt.Println(x, y)
		if x > maxx {
			maxx = x
		}
		if x < minx {
			minx = x
		}
		if y > maxy {
			maxy = y
		}
		if y < miny {
			miny = y
		}
		coords[i] = []int{x, y}
		i++
	}
	height := maxy - miny
	width := maxx - minx
	// Let's make our plane and calculate closest coordinate at same time
	plane := make([][]int, height)
	areas := make(map[int]int)
	for i := 0; i < height; i++ {
		plane[i] = make([]int, width)
		for j := 0; j < width; j++ {
			// Find out who is closest to each point here
			closestDistThusFar := maxx + maxy
			closestIDThusFar := 1
			for ID, c := range coords {
				//fmt.Println(c)
				truex := c[0] - minx
				truey := c[1] - miny
				distx := (j - truex)
				disty := (i - truey)
				if distx < 0 {
					distx = distx * -1
				}
				if disty < 0 {
					disty = disty * -1
				}
				distance := distx + disty
				//fmt.Println(distance)

				if distance < closestDistThusFar {
					closestDistThusFar = distance
					closestIDThusFar = ID
					//fmt.Println("Closest Distance: ", closestDistThusFar, "ID: ", ID, " Closest thus far: ", closestIDThusFar)
				} else if distance == closestDistThusFar {
					//fmt.Println("Same distance...")
					closestIDThusFar = 0
				}
				//fmt.Println("X: ", j, " Y: ", i, " ID: ", ID, " Dist: ", distance, " Closest: ", closestDistThusFar, " ClosestID: ", closestIDThusFar)
			}
			//fmt.Println(closestIDThusFar)
			plane[i][j] = closestIDThusFar
			areas[closestIDThusFar]++
		}
		//fmt.Print("/n")
	}

	// Remove infinte IDs
	for y, row := range plane {
		for x, ID := range row {
			if y == 0 || x == 0 || y == height || x == width {
				_, ok := areas[ID]
				if ok {
					delete(areas, ID)
				}
			}
		}
	}
	max := 0
	for _, area := range areas {
		if area > max {
			max = area
		}
	}
	fmt.Println(max)
	// PART TWO!
	under1000 := 0
	for i, row := range plane {
		for j := range row {
			var sum int
			for _, c := range coords {
				//fmt.Println(c)
				truex := c[0] - minx
				truey := c[1] - miny
				distx := (j - truex)
				disty := (i - truey)
				if distx < 0 {
					distx = distx * -1
				}
				if disty < 0 {
					disty = disty * -1
				}
				distance := distx + disty
				sum += distance
			}
			if sum < 10000 {
				under1000++
			}
		}
	}
	fmt.Println(under1000)

}
