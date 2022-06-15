---
layout: essay
type: essay
title: Featured; Perfect numbers
permalink: essays/perfectnumbers
# All dates must be YYYY-MM-DD format!
date: 2022-06-16
labels:
  - Number theory
  - Problem solving
  - Math
summary: A number that is equal to the sum of its divisors
---

## Introduction

I recently came across perfect numbers in a coding challenge and the topic fascinated me. So I thought to dedicate a blog to these perfect numbers.

A *perfect number* is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. For instance, 6 has divisors 1, 2 and 3 (excluding itself), and 1 + 2 + 3 = 6, so 6 is a perfect number.

The Euclid–Euler theorem is a theorem in number theory that relates perfect numbers to Mersenne primes. It states that an even number is perfect if and only if it has the form $$2^(p−1) * (2p − 1)$$, where $$2p − 1$$ is a prime number. The theorem is named after mathematicians Euclid and Leonhard Euler, who respectively proved the "if" and "only if" aspects of the theorem.

## Sufficiency proof

- $$2^p - 1$$ is prime
- $$σ(2^(p - 1)(2^p - 1)) = σ(2^(p - 1))σ(2^p - 1)$$
- The divisors of $$2^(p - 1)$$ are 1, 2, 4, 8, …, $$2^(p-1)$$ form a geometric series that sum to $$2^p - 1$$. 
- Since $$2^p - 1$$ is prime, it has 2 divisors: $$2^p - 1$$, $$1$$. The sum of the divisors is $$2^p$$
- $$σ(2^(p - 1)(2^p - 1) = σ(2^(p - 1))σ(2^p - 1) = (2^p - 1)(2^p) = 2(2^(p - 1))(2^p - 1)$$
- Therefore, $$2^(p - 1)(2^p - 1)$$ is perfect.

## Necessity Proof

- Suppose an even perfect number is given, and partially factor it as $$2^(k)x = σ(2^(k)x) = (2^(k + 1) - 1)σ(x)$$ (1)
- The odd factor on the right, $$2^(k + 1) - 1$$ is at least 3 and must divide $$x$$, the only odd factor on the left side -> $$y = x / 2(2^(k + 1) - 1)$$ is a proper divisor of $$x$$
- Dividing both sides of (1) by common factor $$2^(k + 1) - 1$$ and taking into account known divisors $$x$$, $$y$$ of $$x$$ -> $$2^(k + 1)y = σ(x) = x + y + … = 2^(k + 1)y + …$$
Therefore, there cannot be other divisors, $$y = 1$$, and $$x$$ must be prime of the form $$2^(k + 1) - 1$$.


