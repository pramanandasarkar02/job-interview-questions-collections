class MinHeap{
    constructor(){
        this.heap = []
    }
    push(node, dist){
        this.heap.push({node, dist});
        this.heap.sort((a, b) => a.dist - b.dist)
    }
    pop(){
        return this.heap.shift();
    }
    isEmpty(){
        return this.heap.length === 0;
    }
}


function dijkstra(graph, start){
    const dist = new Map();
    const visited = new Set();
    const pq = new MinHeap();

    for (const node of graph.keys()) {
        dist.set(node, Infinity)
    }
    dist.set(start, 0);
    pq.push(start, 0);
    while (!pq.isEmpty()) {
        const {node, dist: curDist} = pq.pop();
        if (visited.has(node)) continue;
        visited.add(node);
        for(const[neigh, weight] of graph.get(node) || []){
            const newDist = curDist + weight;
            if(newDist < dist.get(neigh)) {
                dist.set(neigh, newDist);
                pq.push(neigh, newDist)
            }
        }
    }

    return dist;

}

const graph = new Map();
graph.set('A', [['B', 4], ['C', 2]]);
graph.set('B', [['C', 5], ['D', 10]]);
graph.set('C', [['E', 3]]);
graph.set('D', []);
graph.set('E', [['D', 4]]);

const result = dijkstra(graph, 'A');
for (const [node, d] of result.entries()) {
    console.log(`Distance from A to ${node}: ${d}`);
}