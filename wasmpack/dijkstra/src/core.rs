use std::collections::HashMap;

#[derive(Clone)]
pub struct Edge {
    pub start: String,
    pub end: String,
    pub weight: i32,
}

pub fn dijkstra(edges: Vec<Edge>, start: String, end: String) -> String {
    let mut graph: HashMap<String, Vec<(String, i32)>> = HashMap::new();

    // Build graph
    for edge in edges {
        graph
            .entry(edge.start.clone())
            .or_insert_with(Vec::new)
            .push((edge.end.clone(), edge.weight));
    }

    let mut dist: HashMap<String, i32> = HashMap::new();
    let mut prev: HashMap<String, String> = HashMap::new();

    dist.insert(start.clone(), 0);

    // (distance, node)
    let mut pq: Vec<(i32, String)> = vec![(0, start.clone())];

    while !pq.is_empty() {
        pq.sort_by(|a, b| a.0.cmp(&b.0));
        let (d, node) = pq.remove(0);

        if let Some(&best) = dist.get(&node) {
            if d > best {
                continue;
            }
        }

        if node == end {
            break;
        }

        if let Some(neighbors) = graph.get(&node) {
            for (next, weight) in neighbors {
                let nd = d + weight;

                if nd < *dist.get(next).unwrap_or(&i32::MAX) {
                    dist.insert(next.clone(), nd);
                    prev.insert(next.clone(), node.clone());
                    pq.push((nd, next.clone()));
                }
            }
        }
    }

    if !dist.contains_key(&end) {
        return "No path found".to_string();
    }

    let mut path = Vec::new();
    let mut at = Some(end.clone());
    while let Some(node) = at {
        path.push(node.clone());
        at = prev.get(&node).cloned();
    }
    path.reverse();
    path.join(" ")
}
