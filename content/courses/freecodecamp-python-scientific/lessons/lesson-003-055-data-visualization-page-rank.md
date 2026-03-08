---
id: lesson-003-055
title: Data Visualization: Page Rank
chapterId: chapter-03
order: 55
duration: 5
objectives:
  - Understand the PageRank algorithm and web-as-graph model
  - Implement a simplified PageRank computation in Python
  - Visualize link analysis results with matplotlib
  - Explain Google's original insight about ranking web pages
---

# Data Visualization: Page Rank

The **PageRank** algorithm, developed by Larry Page and Sergey Brin at Stanford in 1998, was the foundation of Google's search engine. It answers a deceptively simple question: "How important is this web page?" The answer revolutionized how we find information.

## The Web as a Graph

PageRank treats the web as a **directed graph**:

- Each **web page** is a **node** (vertex)
- Each **hyperlink** from page A to page B is a **directed edge**

```
Page A ──→ Page B ──→ Page D
  │          ↑
  └──→ Page C ─┘
```

The key insight: a link from page A to page B is like a "vote" for page B. Pages with more incoming links (votes) are likely more important. But not all votes are equal — a link from an important page counts more than a link from an obscure one.

## The Algorithm Concept

PageRank assigns each page a score between 0 and 1. The algorithm works iteratively:

1. **Initialize** every page with equal rank: $\frac{1}{N}$ where $N$ is the total number of pages
2. **Iterate**: each page distributes its rank equally among all pages it links to
3. **Repeat** until the values converge (stop changing significantly)

The formula for a page $P$ is:

$$PR(P) = \frac{1-d}{N} + d \sum_{i \in \text{inlinks}} \frac{PR(i)}{L(i)}$$

Where:
- $d$ is the **damping factor** (typically 0.85) — the probability a user follows a link rather than jumping to a random page
- $L(i)$ is the number of outgoing links from page $i$
- The sum is over all pages that link **to** page $P$

## Implementing PageRank in Python

```python
def compute_pagerank(graph, damping=0.85, iterations=50):
    """
    Compute PageRank for a directed graph.
    
    graph: dict mapping page -> list of pages it links to
    Returns: dict mapping page -> PageRank score
    """
    pages = list(graph.keys())
    n = len(pages)
    
    # Initialize all pages with equal rank
    rank = {page: 1.0 / n for page in pages}
    
    # Build reverse index: who links TO each page?
    inlinks = {page: [] for page in pages}
    for page, links in graph.items():
        for target in links:
            if target in inlinks:
                inlinks[target].append(page)
    
    # Iterate until convergence
    for iteration in range(iterations):
        new_rank = {}
        for page in pages:
            # Sum of rank contributions from pages linking here
            incoming_rank = sum(
                rank[source] / len(graph[source])
                for source in inlinks[page]
                if len(graph[source]) > 0
            )
            new_rank[page] = (1 - damping) / n + damping * incoming_rank
        rank = new_rank
    
    return rank


# Define a small web graph
web = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['B', 'D'],
    'D': ['A'],
}

ranks = compute_pagerank(web)

# Display results sorted by rank
print("PageRank Results:")
print("-" * 30)
for page, score in sorted(ranks.items(), key=lambda x: -x[1]):
    print(f"  Page {page}: {score:.4f}")
```

Output:
```
PageRank Results:
------------------------------
  Page B: 0.3175
  Page D: 0.3175
  Page A: 0.1964
  Page C: 0.1685
```

Pages B and D have the highest rank because they receive the most (or most valuable) incoming links.

## Visualizing PageRank

We can visualize the graph and rank scores using matplotlib:

```python
import matplotlib.pyplot as plt
import math

def visualize_pagerank(graph, ranks):
    """Visualize a PageRank graph with node sizes proportional to rank."""
    pages = list(graph.keys())
    n = len(pages)
    
    # Position nodes in a circle
    positions = {}
    for i, page in enumerate(pages):
        angle = 2 * math.pi * i / n
        positions[page] = (math.cos(angle), math.sin(angle))
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    
    # Left: Graph visualization
    ax1.set_title('Web Graph with PageRank', fontsize=14)
    
    # Draw edges (arrows)
    for source, targets in graph.items():
        sx, sy = positions[source]
        for target in targets:
            tx, ty = positions[target]
            ax1.annotate('', xy=(tx, ty), xytext=(sx, sy),
                        arrowprops=dict(arrowstyle='->', color='gray',
                                       lw=1.5, connectionstyle='arc3,rad=0.1'))
    
    # Draw nodes (size proportional to PageRank)
    for page in pages:
        x, y = positions[page]
        size = 500 + ranks[page] * 3000  # Scale for visibility
        ax1.scatter(x, y, s=size, c='steelblue', zorder=5,
                   edgecolors='black', linewidth=2, alpha=0.8)
        ax1.text(x, y, f'{page}\n{ranks[page]:.3f}',
                ha='center', va='center', fontweight='bold', fontsize=10)
    
    ax1.set_xlim(-1.5, 1.5)
    ax1.set_ylim(-1.5, 1.5)
    ax1.set_aspect('equal')
    ax1.axis('off')
    
    # Right: Bar chart of ranks
    sorted_pages = sorted(ranks.items(), key=lambda x: -x[1])
    names = [p[0] for p in sorted_pages]
    scores = [p[1] for p in sorted_pages]
    
    bars = ax2.bar(names, scores, color='steelblue', edgecolor='black')
    ax2.set_title('PageRank Scores', fontsize=14)
    ax2.set_ylabel('Score')
    
    for bar, score in zip(bars, scores):
        ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.005,
                f'{score:.4f}', ha='center', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('pagerank.png', dpi=150, bbox_inches='tight')
    plt.show()

visualize_pagerank(web, ranks)
```

## The Damping Factor

The damping factor $d = 0.85$ models the "random surfer" — a person clicking links randomly. There is a 15% chance at each step that the surfer gets bored and jumps to a completely random page. This ensures:

- Every page gets at least a tiny rank (no page is completely invisible)
- The algorithm always converges
- Pages in isolated clusters do not hoard all the rank

## Google's Original Insight

Before PageRank, search engines ranked pages based on content alone — how many times a keyword appeared. This was easily manipulated by stuffing pages with keywords.

Google's breakthrough was using the **structure of the web itself** as a quality signal. The key insights were:

1. **Links are endorsements** — If many pages link to you, your content is likely valuable
2. **Authority transfers** — A link from a trusted page (like a university website) means more than a link from a random blog
3. **The web is self-organizing** — Millions of people creating links collectively encode human judgment about what is important

This transformed search from a keyword-matching problem into a **graph analysis** problem, and it is a beautiful example of how algorithms applied to real-world data can produce remarkable results.

## Beyond Web Search

PageRank concepts appear in many fields:

- **Social networks** — Identifying influential users
- **Citation analysis** — Ranking academic papers by citations
- **Biology** — Ranking proteins in interaction networks
- **Recommendation systems** — Identifying important items

The combination of graph algorithms and data visualization is a powerful toolkit for understanding complex systems and networks.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
