package main

import "fmt"

func shortest_path(startIndex, endIndex int, graph map[int][]int) []int{
	queue := []int{startIndex}
	visted := map[int]bool{startIndex: true}
	parent := map[int]int{}

	for len(queue) > 0{
		node := queue[0]
		queue = queue[1:]

		if node == endIndex {
			path := []int{}
			for cur := endIndex; ; cur = parent[cur]{
				path = append([]int{cur}, path...)
				if cur == startIndex {
					break
				}
			}
			return path
		}

		for _, neighbor := range graph[node] {
			if !visted[neighbor] {
				visted[neighbor] = true
				parent[neighbor] = node 
				queue = append(queue, neighbor)
			}
		}
	}
	return nil
}

func main(){
	graph := map[int][]int{
		1: {2, 3},
		2: {4},
		3: {4, 5},
		4: {6},
		5: {6},
	}

	path := shortest_path(1, 6, graph)
	fmt.Printf("\nThe undirected shortest path is %v\n", path) 
}

