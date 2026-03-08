---
id: lesson-003-009
title: Core Learning Algorithms: Clustering
chapterId: chapter-03
order: 9
duration: 5
objectives:
  - Explain unsupervised learning and how it differs from supervised learning
  - Describe the K-means algorithm step by step including initialization, assignment, and update
  - Use the elbow method to choose an appropriate number of clusters
  - Implement K-means clustering with scikit-learn on a 2D dataset
  - Recognize the limitations of K-means and when alternative clustering algorithms are needed
---

# Core Learning Algorithms: Clustering

Clustering is an **unsupervised learning** technique — the algorithm discovers structure in data without labeled examples. Instead of learning from input-output pairs, clustering finds natural groupings based on similarity. The most widely used clustering algorithm is K-means.

## Supervised vs. Unsupervised Learning

```
Supervised Learning:                  Unsupervised Learning:
Input:  Features + Labels             Input:  Features only (no labels)
Goal:   Predict labels for new data   Goal:   Discover patterns/groups
Result: A predictive model            Result: Cluster assignments

Example: "This email is spam"         Example: "These 500 customers
          → predict spam/not spam               are similar to each other"
```

With unsupervised learning, there is no "right answer" to compare against. You evaluate results by examining whether the discovered groups are meaningful and useful.

## The K-Means Algorithm

K-means partitions n data points into K clusters, where each point belongs to the cluster with the nearest center (centroid). The algorithm is simple and iterative:

### Step-by-Step Process

```
K-Means Algorithm (K=3):

Step 1: INITIALIZE
   Randomly place K centroids in the feature space.

   • C1          • C2

              • C3

Step 2: ASSIGN
   Assign each data point to the nearest centroid.

   [Cluster 1]   [Cluster 2]
   x x x         x x
   x x           x x x
         [Cluster 3]
         x x x x

Step 3: UPDATE
   Move each centroid to the mean of its assigned points.

   •C1 (moved)   •C2 (moved)

         •C3 (moved)

Step 4: REPEAT Steps 2-3
   Until centroids stop moving (convergence).
```

More formally:

1. **Initialize**: Choose K random points as initial centroids.
2. **Assign**: For each data point, calculate the distance to every centroid. Assign it to the nearest centroid.
3. **Update**: Recalculate each centroid as the mean of all points assigned to it.
4. **Repeat**: Go back to step 2. Stop when assignments no longer change (or change very little).

## Implementing K-Means with Scikit-Learn

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

# Generate a synthetic 2D dataset with 4 natural clusters
X, y_true = make_blobs(
    n_samples=300,
    centers=4,
    cluster_std=0.60,
    random_state=42
)

# Apply K-means with K=4
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
kmeans.fit(X)

# Results
labels = kmeans.labels_         # Cluster assignment for each point
centroids = kmeans.cluster_centers_  # Final centroid positions
inertia = kmeans.inertia_       # Sum of squared distances to centroids

print(f"Cluster labels: {np.unique(labels)}")
print(f"Centroid positions:\n{centroids}")
print(f"Inertia: {inertia:.2f}")

# Visualize the results
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', s=30, alpha=0.7)
plt.scatter(centroids[:, 0], centroids[:, 1], c='red', marker='X', s=200, edgecolors='black')
plt.title('K-Means Clustering (K=4)')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()
```

## Choosing K: The Elbow Method

The hardest part of K-means is choosing the right number of clusters. The **elbow method** helps by plotting the **inertia** (sum of squared distances from each point to its centroid) against different values of K:

```python
inertias = []
K_range = range(1, 11)

for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X)
    inertias.append(km.inertia_)

plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Inertia')
plt.title('Elbow Method for Optimal K')
plt.show()

# Look for the "elbow" where inertia stops decreasing sharply
# In this example, the elbow should appear at K=4
```

The "elbow" is the point where adding more clusters provides diminishing returns. Before the elbow, inertia drops sharply; after it, the decrease is minimal.

```
Inertia
  |\
  | \
  |  \
  |   \
  |    \_____  <-- Elbow (choose this K)
  |          \________
  |__________________________ K
  1  2  3  4  5  6  7  8  9
```

## Limitations of K-Means

K-means is fast and intuitive, but it has important limitations:

1. **Requires specifying K in advance**: You must decide the number of clusters before running the algorithm.
2. **Assumes spherical clusters**: K-means struggles with elongated, irregular, or nested cluster shapes.
3. **Sensitive to initialization**: Different starting centroids can produce different results. Use `n_init=10` (the default) to run the algorithm multiple times with different initializations.
4. **Sensitive to outliers**: A single outlier can pull a centroid away from the true cluster center.
5. **Equal-size bias**: K-means tends to produce clusters of similar size, even when natural clusters vary in size.

For non-spherical clusters, consider **DBSCAN** (density-based clustering) or **hierarchical clustering**. For very large datasets, **Mini-Batch K-Means** provides a faster approximation.

Despite these limitations, K-means remains the go-to clustering algorithm for many real-world applications due to its simplicity and efficiency.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
