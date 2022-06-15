---
layout: project
type: project
image: images/wordle.png
title: SAConvnets
permalink: projects/wordle_solver
# All dates must be YYYY-MM-DD format!
date: 2022-04-03
labels:
  - AI
  - Statistics
  - Information Retrieval
summary: Wordle Solver using statistical entropy
---

# Wordle Solver

[Replit](https://replit.com/@weichen-huang/Wordle-Solver)
[Wordle](https://wordlev2.github.io/)
[3b1b's video](https://www.youtube.com/watch?v=v68zYyaEmEA&t=410s)

This project was heavily inspired by 3b1b's video linked above.

## Wordle?

Wordle is a web-based word game where players have six attempts to guess a five-letter word, with feedback given for each guess in the form of colored tiles indicating when letters match or occupy the correct position. The mechanics are similar to scrabble, except for the word length limit. Wordle has a single daily solution, with all players attempting to guess the same word.

## Entropy

Entropy is a concept that expresses how much uncertainty there is in something we don’t perfectly know. In the case of Wordle, we try to minimize the entropy value. The entropy value can be calculated as $$H(x) = \sum_{i=1}^{N} P(X = x_{i}) log_{2} P(X = x_{i}) \\$$

## Final algorithm

- Compute the entropy for all possible words
- Choose the word that has the highest entropy
- Submit guess to Wordle and fetch the output
- Update list of remaining possible words
- Repeat steps 1–4 until the guess is equal to the answer

Here's the embed below:

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@weichen-huang/Wordle-Solver?embed=true"></iframe>
