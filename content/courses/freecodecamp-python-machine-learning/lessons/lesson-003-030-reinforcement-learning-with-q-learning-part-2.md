---
id: lesson-003-030
title: Reinforcement Learning With Q-Learning: Part 2
chapterId: chapter-03
order: 30
duration: 5
objectives:
  - Explain the Q-table data structure and how it stores state-action values
  - Apply the Bellman equation to update Q-values during learning
  - Understand the roles of the discount factor (gamma) and learning rate (alpha)
  - Walk through a complete grid-world Q-learning example step by step
  - Recognize the conditions under which Q-learning converges to optimal values
---

# Reinforcement Learning With Q-Learning: Part 2

Now that we understand the RL framework, we dive into **Q-Learning** — one of the most fundamental and widely-taught RL algorithms. Q-Learning learns the value of taking each action in each state, building up a table of knowledge that defines the optimal policy.

## What is a Q-Value?

A **Q-value** (Quality value) represents the expected cumulative reward of taking action $a$ in state $s$ and then following the optimal policy thereafter:

$$Q(s, a) = \text{Expected total reward starting from state } s \text{, taking action } a$$

If we know the Q-values for every state-action pair, the optimal policy is simple: in each state, take the action with the highest Q-value.

## The Q-Table

For environments with discrete states and actions, we store Q-values in a **Q-table** — a 2D array where rows represent states and columns represent actions:

```python
import numpy as np

num_states = 16    # e.g., 4x4 grid = 16 possible positions
num_actions = 4    # Up, Down, Left, Right

# Initialize Q-table with zeros
q_table = np.zeros((num_states, num_actions))

# After training, the table might look like:
# State | Up    | Down  | Left  | Right
# 0     | 0.25  | 0.50  | 0.10  | 0.80  ← Best action: Right (0.80)
# 1     | 0.30  | 0.12  | 0.25  | 0.65  ← Best action: Right (0.65)
# ...   | ...   | ...   | ...   | ...
```

## The Bellman Equation

The heart of Q-Learning is the **Bellman equation**, which defines how Q-values should be updated based on experience:

$$Q(s, a) \leftarrow Q(s, a) + \alpha \left[ r + \gamma \cdot \max_{a'} Q(s', a') - Q(s, a) \right]$$

Breaking this down:

| Symbol | Meaning | Typical Value |
|--------|---------|---------------|
| $Q(s, a)$ | Current Q-value for state $s$, action $a$ | From the Q-table |
| $\alpha$ | **Learning rate** — how much to update | 0.1 – 0.5 |
| $r$ | Reward received after taking action $a$ | From the environment |
| $\gamma$ | **Discount factor** — importance of future rewards | 0.9 – 0.99 |
| $\max_{a'} Q(s', a')$ | Best Q-value achievable from the next state | From the Q-table |

### The Learning Rate ($\alpha$)

Controls how much new information overrides old information:
- $\alpha = 0$: Never learn (Q-values never change)
- $\alpha = 1$: Completely replace old value with new estimate
- $\alpha = 0.1$: Update slowly, smoothing out noise in rewards

### The Discount Factor ($\gamma$)

Controls how much the agent values future rewards vs. immediate rewards:
- $\gamma = 0$: Completely myopic — only cares about the immediate reward
- $\gamma = 0.9$: Values future rewards but prefers sooner ones
- $\gamma = 0.99$: Strongly values long-term outcomes
- $\gamma = 1.0$: Treats all future rewards equally (can cause issues in infinite environments)

## Step-by-Step Grid-World Example

Let us walk through Q-Learning on a simple 2x3 grid:

```
[0][1][2]
[3][4][G]

G = Goal (state 5), reward = +10
All other transitions: reward = -1
Actions: Right (0), Down (1), Left (2), Up (3)
```

Parameters: $\alpha = 0.5$, $\gamma = 0.9$, initial Q-values = 0

**Episode 1, Step 1**: State=0, Action=Right, New State=1, Reward=-1

$$Q(0, \text{Right}) \leftarrow 0 + 0.5 \times [-1 + 0.9 \times \max(Q(1, \cdot)) - 0]$$
$$Q(0, \text{Right}) \leftarrow 0 + 0.5 \times [-1 + 0.9 \times 0 - 0] = -0.5$$

**Episode 1, Step 2**: State=1, Action=Right, New State=2, Reward=-1

$$Q(1, \text{Right}) \leftarrow 0 + 0.5 \times [-1 + 0.9 \times 0 - 0] = -0.5$$

**Episode 1, Step 3**: State=2, Action=Down, New State=5(Goal), Reward=+10

$$Q(2, \text{Down}) \leftarrow 0 + 0.5 \times [10 + 0.9 \times 0 - 0] = 5.0$$

After just this one episode, the Q-table has learned that going Down from state 2 is valuable!

**Episode 2**: Starting from state 0 again, the agent might take the path 0→1→2→5. This time:

$$Q(1, \text{Right}) \leftarrow -0.5 + 0.5 \times [-1 + 0.9 \times 5.0 - (-0.5)] = -0.5 + 0.5 \times 4.0 = 1.5$$

The positive reward from the goal is **propagating backward** through the Q-table! Over many episodes, every state learns the value of each action relative to reaching the goal.

## The Complete Q-Learning Algorithm

```python
def q_learning(env, num_episodes, alpha=0.1, gamma=0.99, epsilon=1.0,
               epsilon_decay=0.995, epsilon_min=0.01):
    """Train a Q-table using Q-Learning."""
    q_table = np.zeros((env.observation_space.n, env.action_space.n))
    
    for episode in range(num_episodes):
        state = env.reset()
        done = False
        
        while not done:
            # Choose action (epsilon-greedy)
            if np.random.random() < epsilon:
                action = env.action_space.sample()  # Explore
            else:
                action = np.argmax(q_table[state])  # Exploit
            
            # Take action, observe result
            next_state, reward, done, info = env.step(action)
            
            # Update Q-value using Bellman equation
            best_next = np.max(q_table[next_state])
            q_table[state, action] += alpha * (
                reward + gamma * best_next - q_table[state, action]
            )
            
            state = next_state
        
        # Decay epsilon
        epsilon = max(epsilon_min, epsilon * epsilon_decay)
    
    return q_table
```

## Convergence

Q-Learning is guaranteed to converge to the optimal Q-values under two conditions:
1. Every state-action pair is visited infinitely often (ensured by exploration)
2. The learning rate decays appropriately over time

In practice, convergence happens in a finite number of episodes for small, discrete environments.

## Key Takeaways

- A **Q-table** stores the expected cumulative reward for every state-action pair
- The **Bellman equation** updates Q-values by combining the immediate reward with the best future value
- The **learning rate** ($\alpha$) controls how quickly old estimates are replaced
- The **discount factor** ($\gamma$) balances immediate vs. future rewards
- Rewards **propagate backward** through the Q-table over many episodes, teaching the agent which early actions lead to long-term success

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
