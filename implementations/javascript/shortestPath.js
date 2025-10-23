// using bfs
const shortestPath = (startIndex, endIndex, graph) => {
    const queue = [startIndex];
    const parent = new Map();
    const visited = new Set([startIndex]);

    while (queue.length > 0) {
        const node = queue.shift();

        for (const neigh of graph.get(node) || []) {
            if (!visited.has(neigh)) {
                visited.add(neigh);
                parent.set(neigh, node);
                queue.push(neigh);
                if (neigh == endIndex) {
                    const path = [endIndex];
                    let cur = endIndex;
                    while (cur != startIndex) {
                        cur = parent.get(cur);
                        path.unshift(cur);
                    }
                    return path;
                }
            }
        }
    }
    return [];
};

const graph = new Map();
graph.set(1, [2, 4, 5]);
graph.set(1, [2, 4, 5]);
graph.set(2, [3]);
graph.set(4, [3]);
graph.set(5, []);
graph.set(3, []);

console.log(shortestPath(1, 3, graph))