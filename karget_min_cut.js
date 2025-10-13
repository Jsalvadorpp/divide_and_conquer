const fs = require("fs");
const data = fs.readFileSync("kargetMinCut.txt", "utf8");

const lines = data.trim().split("\n");
const graph = {};

for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    const node = parts[0];

    const edges = parts.slice(1);
    graph[node] = edges;
}


const input = {
    A: ['B', 'C', 'D'],
    B: ['A', 'C', 'D'],
    C: ['A', 'B', 'D'],
    D: ['A', 'B', 'C']
};

const findMinCuts = (graph) => {
    let outputGraph = JSON.parse(JSON.stringify(graph));

    // only 2 vertices remanin - BASE CASE
    if (Object.keys(outputGraph).length == 2 ) {
        const node1 = Object.keys(outputGraph)[0]
        
        // total edges
        return outputGraph[node1].length
    }
    const pickEdge = pickRandomEdge(outputGraph)
    mergeVertices(pickEdge, outputGraph)

    return findMinCuts(outputGraph)
}

const mergeVertices = (edgesToMerge, graph) => {
    const node1 = edgesToMerge[0]
    const node2 = edgesToMerge[1]

    const edges2 = graph[node2]

    delete graph[node2]

    graph[node1].push(...edges2)

    const nodes = Object.keys(graph)

    nodes.forEach(node => {
        for (let i = 0; i < graph[node].length; i++){
            const edge = graph[node][i]

            if (edge == node2) graph[node][i] = node1
            
        }
    })

    // remove self loop edges
    graph[node1] = graph[node1].filter(node => node !== node1)
   
    return graph
}


const pickRandomEdge = (graph) => {
    let randomNum = Math.floor(Math.random() * Object.keys(graph).length)
    const randomNode = Object.keys(graph)[randomNum]

    randomNum = Math.floor(Math.random() * graph[randomNode].length)

    return [randomNode, graph[randomNode][randomNum]]
}

// Try multiple times (because it's random)
let output = Infinity;
for (let i = 0; i < 100; i++) {
    const cut = findMinCuts(graph);
    if (cut < output) output = cut;
}

console.log(output);
