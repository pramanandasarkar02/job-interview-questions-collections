package main

import "fmt"


type  Color string
const (
	RED Color = "Red"
	GREEN Color = "Green"
)

func isBiColorable(n int, graph map[int][]int) bool {
	color := make(map[int]Color)
	for i := 0; i < n; i++ {
		queue := []int{i}
		color[i] = RED

		for len(queue) > 0{
			node := queue[0]
			queue := queue[1:]

			for _, neighbor := range(graph[node]){
				if _, ok := color[neighbor]; !ok{
					if color[node] == RED {
						color[neighbor] = GREEN
					} else {
						color[neighbor] = RED
					}
					queue = append(queue, neighbor)
				} else if color[node] == color[neighbor] {
					return false
				}
			}
		}
	}
	return true
}

func main(){
	graph := map[int][]int{
		0: {1, 3},
		1: {0, 2},
		2: {1, 3},
		3: {0, 2},
	}

	fmt.Println(isBiColorable(4, graph)) // true

	graph2 := map[int][]int{
		0: {1, 2},
		1: {0, 2},
		2: {0, 1},
	}

	fmt.Println(isBiColorable(3, graph2)) // false
}