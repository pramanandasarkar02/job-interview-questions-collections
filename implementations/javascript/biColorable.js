const Color = Object.freeze({
    RED: "red",
    BLUE: "blue"
});


function isBipartile(graph) {
    const color = new Map()

    for(const start of graph.keys()){
        if(!color.has(start)){
            const queue = [start]
            color.set(start, color.RED)
            while (queue.length > 0) {
                const node = queue.shift();

                for(const neigh of graph.get(node) || []) {
                    if(!color.has(neigh)) {
                        color.set(neigh, color.get(node) == Color.RED? Color.BLUE : Color.RED)
                        queue.push(neigh)
                    } else if (color.get(neigh) === color.get(node)) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

const graph = new Map();
graph.set(1, [2, 3]);
graph.set(2, [1, 4]);
graph.set(3, [1, 4]);
graph.set(4, [2, 3]);

console.log(isBipartile(graph));