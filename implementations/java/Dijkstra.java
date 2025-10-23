import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class Dijkstra {
    static class Edge {
        int to, weight;

        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    static class Node implements Comparable<Node> {
        int vertex, dist;

        Node(int vertex, int dist) {
            this.vertex = vertex;
            this.dist = dist;
        }

        public int compareTo(Node other) {
            return this.dist - other.dist;
        }
    }

    public static Map<Integer, Integer> dijkstra(Map<Integer, List<Edge>> graph, int startIndex) {
        Map<Integer, Integer> dist = new HashMap<>();
        Set<Integer> visited = new HashSet<>();
        PriorityQueue<Node> pq = new PriorityQueue<>();

        for (int node : graph.keySet()) {
            dist.put(node, Integer.MAX_VALUE);
        }
        dist.put(startIndex, 0);
        pq.add(new Node(startIndex, 0));

        while (!pq.isEmpty()) {
            Node cur = pq.poll();
            if (visited.contains(cur.vertex))
                continue;
            visited.add(cur.vertex);

            for (Edge edge : graph.getOrDefault(cur.vertex, new ArrayList<>())) {
                int newDist = dist.get(cur.vertex) + edge.weight;
                if (newDist < dist.get(edge.to)) {
                    dist.put(edge.to, newDist);
                    pq.add(new Node(edge.to, newDist));
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        // Create graph
        Map<Integer, List<Edge>> graph = new HashMap<>();
        graph.put(1, Arrays.asList(new Edge(2, 4), new Edge(3, 2)));
        graph.put(2, Arrays.asList(new Edge(3, 5), new Edge(4, 10)));
        graph.put(3, Arrays.asList(new Edge(5, 3)));
        graph.put(4, new ArrayList<>());
        graph.put(5, Arrays.asList(new Edge(4, 4)));

        // Run Dijkstra
        Map<Integer, Integer> result = Dijkstra.dijkstra(graph, 1);

        // Print results
        for (int node : result.keySet()) {
            System.out.println("Distance from 1 to " + node + " = " + result.get(node));
        }
    }
}
