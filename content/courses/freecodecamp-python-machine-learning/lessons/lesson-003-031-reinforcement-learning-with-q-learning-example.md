---
id: lesson-003-031
title: Reinforcement Learning With Q-Learning: Example
chapterId: chapter-03
order: 31
duration: 5
objectives:
  - Set up and interact with the FrozenLake environment using OpenAI Gym
  - Implement a complete Q-table training loop with epsilon decay
  - Evaluate a trained RL agent by measuring success rate over test episodes
  - Visualize the learned policy as a grid of optimal actions
  - Tune hyperparameters to improve agent performance in a stochastic environment
---

# Reinforcement Learning With Q-Learning: Example

In this lesson, we implement Q-Learning from scratch using **OpenAI Gym's FrozenLake environment**. This is a complete, working example that you can run and experiment with to build intuition for how RL agents learn.

## The FrozenLake Environment

FrozenLake is a grid-world where an agent must navigate across a frozen lake from Start (S) to Goal (G) while avoiding Holes (H):

```
SFFG
FHFH
FFFH
HFFG

S = Start, F = Frozen (safe), H = Hole (fall in, episode ends), G = Goal
```

The catch: the ice is **slippery**. When you choose to go Right, you might actually slide Up or Down instead. This stochasticity makes the problem significantly harder.

```python
import gym
import numpy as np

# Create the environment
env = gym.make('FrozenLake-v1', map_name='4x4', is_slippery=True)

print(f"State space: {env.observation_space.n}")   # 16 states (4x4 grid)
print(f"Action space: {env.action_space.n}")        # 4 actions (Left, Down, Right, Up)
```

Action encoding: 0=Left, 1=Down, 2=Right, 3=Up

Rewards:
- Reaching the Goal: **+1**
- Falling in a Hole: **0** (episode ends)
- Each step on ice: **0** (no intermediate reward)

## Complete Q-Learning Implementation

```python
import numpy as np
import gym

def train_agent(env, num_episodes=10000, alpha=0.8, gamma=0.95,
                epsilon=1.0, epsilon_decay=0.9995, epsilon_min=0.01):
    """
    Train a Q-Learning agent on FrozenLake.
    
    Args:
        env: OpenAI Gym environment
        num_episodes: Number of training episodes
        alpha: Learning rate
        gamma: Discount factor
        epsilon: Initial exploration rate
        epsilon_decay: Epsilon decay rate per episode
        epsilon_min: Minimum exploration rate
    
    Returns:
        q_table: Trained Q-value table
        rewards_history: List of total rewards per episode
    """
    # Initialize Q-table with zeros
    q_table = np.zeros((env.observation_space.n, env.action_space.n))
    rewards_history = []
    
    for episode in range(num_episodes):
        state = env.reset()
        # Handle newer Gym versions that return (state, info)
        if isinstance(state, tuple):
            state = state[0]
        
        done = False
        total_reward = 0
        
        while not done:
            # Epsilon-greedy action selection
            if np.random.random() < epsilon:
                action = env.action_space.sample()  # Explore
            else:
                action = np.argmax(q_table[state])  # Exploit
            
            # Take action
            result = env.step(action)
            if len(result) == 5:
                next_state, reward, terminated, truncated, info = result
                done = terminated or truncated
            else:
                next_state, reward, done, info = result
            
            # Q-value update (Bellman equation)
            best_next_q = np.max(q_table[next_state])
            q_table[state, action] = q_table[state, action] + alpha * (
                reward + gamma * best_next_q - q_table[state, action]
            )
            
            state = next_state
            total_reward += reward
        
        # Decay epsilon
        epsilon = max(epsilon_min, epsilon * epsilon_decay)
        rewards_history.append(total_reward)
        
        # Print progress every 1000 episodes
        if (episode + 1) % 1000 == 0:
            avg_reward = np.mean(rewards_history[-1000:])
            print(f"Episode {episode + 1}/{num_episodes} | "
                  f"Avg Reward (last 1000): {avg_reward:.3f} | "
                  f"Epsilon: {epsilon:.4f}")
    
    return q_table, rewards_history

# Train the agent
env = gym.make('FrozenLake-v1', map_name='4x4', is_slippery=True)
q_table, rewards_history = train_agent(env, num_episodes=10000)
```

Expected output:
```
Episode 1000/10000  | Avg Reward (last 1000): 0.032 | Epsilon: 0.6065
Episode 2000/10000  | Avg Reward (last 1000): 0.178 | Epsilon: 0.3679
Episode 5000/10000  | Avg Reward (last 1000): 0.524 | Epsilon: 0.0821
Episode 10000/10000 | Avg Reward (last 1000): 0.684 | Epsilon: 0.0100
```

## Evaluating the Trained Agent

```python
def evaluate_agent(env, q_table, num_episodes=1000):
    """Test the trained agent without exploration."""
    successes = 0
    
    for _ in range(num_episodes):
        state = env.reset()
        if isinstance(state, tuple):
            state = state[0]
        done = False
        
        while not done:
            action = np.argmax(q_table[state])  # Always exploit
            result = env.step(action)
            if len(result) == 5:
                state, reward, terminated, truncated, _ = result
                done = terminated or truncated
            else:
                state, reward, done, _ = result
            
            if reward == 1.0:
                successes += 1
    
    success_rate = successes / num_episodes
    print(f"Success rate: {success_rate:.2%} ({successes}/{num_episodes})")
    return success_rate

evaluate_agent(env, q_table)
# Expected: Success rate: ~70-75% (due to slippery ice)
```

## Visualizing the Learned Policy

Convert the Q-table into a human-readable policy:

```python
def visualize_policy(q_table, grid_size=4):
    """Display the learned policy as a grid of arrows."""
    action_symbols = ['\u2190', '\u2193', '\u2192', '\u2191']  # Left, Down, Right, Up
    
    print("\nLearned Policy:")
    print("-" * (grid_size * 4 + 1))
    
    for row in range(grid_size):
        line = "|"
        for col in range(grid_size):
            state = row * grid_size + col
            best_action = np.argmax(q_table[state])
            
            # Mark special states
            if state == 15:  # Goal
                line += " G |"
            elif state in [5, 7, 11, 12]:  # Holes
                line += " H |"
            else:
                line += f" {action_symbols[best_action]} |"
        
        print(line)
        print("-" * (grid_size * 4 + 1))

visualize_policy(q_table)
```

Output:
```
Learned Policy:
-----------------
| ↓ | → | ↓ | ← |
-----------------
| ↓ | H | ↓ | H |
-----------------
| → | ↓ | ↓ | H |
-----------------
| H | → | → | G |
-----------------
```

## Plotting Training Progress

```python
import matplotlib.pyplot as plt

def plot_training(rewards_history, window=500):
    """Plot moving average of rewards during training."""
    moving_avg = np.convolve(rewards_history, np.ones(window)/window, mode='valid')
    
    plt.figure(figsize=(10, 4))
    plt.plot(moving_avg)
    plt.title(f'Q-Learning Training Progress (Moving Avg, window={window})')
    plt.xlabel('Episode')
    plt.ylabel('Average Reward')
    plt.ylim(0, 1)
    plt.grid(True, alpha=0.3)
    plt.show()

plot_training(rewards_history)
```

## Hyperparameter Tuning

| Parameter | Too Low | Good Range | Too High |
|-----------|---------|------------|----------|
| **alpha** (learning rate) | Slow learning | 0.1 – 0.8 | Unstable, oscillates |
| **gamma** (discount) | Myopic, ignores goal | 0.9 – 0.99 | Overvalues distant rewards |
| **epsilon_decay** | Explores too long | 0.999 – 0.9999 | Stops exploring too early |
| **num_episodes** | Undertrained | 5,000 – 20,000 | Diminishing returns |

For FrozenLake specifically, a higher learning rate (0.8) works well because the environment is stochastic and the agent needs to quickly adapt when it discovers successful paths.

## Key Takeaways

- **FrozenLake** is a classic RL benchmark with 16 states, 4 actions, and stochastic transitions
- A well-trained Q-table agent achieves **~70-75% success rate** on slippery ice (optimal given the randomness)
- **Epsilon decay** is essential: explore heavily early on, then gradually shift to exploitation
- Visualizing the **learned policy** as a grid of arrows provides intuitive understanding of what the agent learned
- The training curve shows a clear **learning trajectory** from random behavior to near-optimal performance

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
