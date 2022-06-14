---
layout: essay
type: essay
title: Characteristics the optimal solution; a technique for finding observations
permalink: essays/opt_soln
# All dates must be YYYY-MM-DD format!
date: 2022-06-14
labels:
  - Codeforces
  - Problem solving
  - CP
summary: Technique for problem solving.
---


## Introduction

I was reading Codeforces blogs one day and [this](https://codeforces.com/blog/entry/99291) struck me in particular.
Here's my version of it.

Some of you smart people out there may find the contents of this blog so obvious, that it does not deserve to be called a "technique." It is just the totally normal thought process that comes across our minds when we try to solve a problem!

However, I often find it useful (and others may relate) to state my thoughts explicitly when trying to conquer a problem, whether I write it down on a sheet of paper, comment it in my code, or just talk out loud like a crazy guy :D. I observe that one of the things that makes a problem-solver better than another (other than practice and knowledge about certain topics/algorithms, of course) is the way of thinking and approaching a problem. So, to make myself a better problem-solver, I sometimes go about thinking about how I think and try to improve this way of thinking generically and generally about any problem. It is, to many great problem-solvers, one of the byproducts of practicing problems a lot that develops implicitly, and stating such byproducts to myself explicitly is very helpful to me in order to speed up my learning process.

In this blog, I will try to explain a technique of thinking that I found recurring and often helpful in facing many problems that may seem daunting to many people at first sight, with an unorganized train of thought. Afterward, I will try to apply this technique to some Codeforces problems I solved that I found considerably challenging to go about when I haven't tried this technique explicitly.

## The technique

A lot of the problems we face involve finding an optimal solution of some kind, e.g. find a subsequence that has minimum * something * or find a graph of an array that satisfies some requirements. The main technique is to think as follows:

*Suppose I did find such a solution, what would it look like? what characteristics it would have? Can we toy around with such a solution so that it remains optimal?*

From asking ourselves this question and trying to answer it, we are able to come up with very useful observations that help us in finding the solution. Moreover, the important thing is to have the courage to toy around with the solution and often you would try to reduce it while still satisfying the requirements (e.g. if a subsequence has a minimum * something *, can I reduce the number of elements in it so that it still has the minimum * something *?) If you still don't fully comprehend how useful this may be, don't worry; it will be more clear with the problems.

## Problem 1: 1592C. Bakry and Partitioning


So, the problem asks us to find a way to partition our tree into a forest, where each tree has the same bitwise XOR value as all the other trees. Let's try to apply our technique here:

Suppose I did find a way to partition my trees into a forest, and now I have a forest containing $q$ trees with the same bitwise XOR value $x$, are there any characteristics of these $q$ trees? Can I toy around with them a bit and reduce the number of trees?

In this problem, it would be useful to toy around with them.

We note that if we have a tree that we partitioned into 2 trees with XOR values $a$ and $b$, then it is clear that before partitioning, the whole tree had an XOR value of $a \oplus b$. That means that the kind of "toying around" we can do here is to merge two trees into one with and XOR their values. Now, let's get back to our optimal solution. If we try to merge two trees that both have an XOR value of $x$, then the resultant tree has an XOR value $x \oplus x = 0$ (don't worry, we didn't ruin the optimality of the solution). If we merge one more tree to the resultant tree, the final tree would have an XOR value of $x \oplus 0 = x$. So, if we have $q$ trees in our optimal solution, we can reduce them to $q - 2$ trees, and the solution would still remain optimal. So, if $q$ is even, we can reduce it to $2$ and if $q$ is odd we can reduce it to $3$. This means that if a solution exists with $q$ trees, then so does a solution with $q \mod 2 + 2$ trees, and we only need to check if we can cut one edge or two edges. The remaining part of the problem is some proper handling of the two cases which is irrelevant to this blog (you can check it out in the editorial if it is still a little difficult for you).

## Problem 2: 1629D. Peculiar Movie Preferences

We note that if one string is a palindrome, then we are done (if there is a string of length 1, it would automatically be a palindrome, so we would assume that no strings are of length 1). Otherwise, let's apply our technique:

If a palindrome consists of multiple strings, what would they look like? Can I toy around with them a bit?

Now, it is important to note that if a string is a palindrome, then every prefix is also a suffix of the string. So, if we have a palindromic string consisting of strings of lengths 2 and 3, we can toy around with it by fixing the first string and the last string and drop those in between, and the string would still remain palindromic. This reduces the problem to finding two strings that can be concatenated to form a palindrome.

## Problem 3: 1366D. Two Divisors

At first sight, the problem would make me scratch my head a while, asking recurrently "how do I find such divisors?". However, I try to apply this technique and ask:

Let's suppose I did find two divisors $d_1$ and $d_2$ where $\text{gcd}(d_1 + d_2, a_i) = 1$, what characteristics can those two divisors have?

Well it's important to note that $d_1$ and $d_2$ are divisors of $a_i$, but if $\text{gcd}(d_1 + d_2, a_i) = 1$, then for every prime $p|a_i$, $p \not | (d_1 + d_2) \implies p \not | d_1$ or $p \not | d_2$. This means that if there is a prime $p$ that divides $d_1$, it can not divide $d_2$, otherwise $\text{gcd}(d_1 + d_2, a_i) \ge p$, so we immediately conclude $\text{gcd}(d_1, d_2) = 1$, which can't happen if $a_i$ has one prime divisor, so we assume it would have more than one prime divisor.

If we look at such divisors, we note that if a prime $p$ does not divide both divisors, then it is possible that it may divide their sum (e.g. $5 | (2 + 3)$). However, if for every prime divisor of $a_i$, $p$ divides one of the two divisors and not the other, then we are certain that $p$ doesn't divide their sum (because if we assume WLOG $p | d_1$, then $d_1 + d_2 \equiv d_2 \pmod{p}$). This means we can partition the primes of $a_i$ into $d_1$ and $d_2$, and so each prime would divide one of the divisors and not the other. So, we can solve the problem by taking one prime divisor of $a_i$, p, that divides $a_i$ and divide $a_i$ by it until it's no longer divisible, and check if $a_i$ still remains more than 1 and if so, we would have our solution. That one prime divisor of $a_i$ can be found using normal sieve of eratosthenes.

## Problem 4: 1343E. Weights Distributing

It can be apparent that we should distribute the weights on our path greedily, with the minimum having the highest priority. The number of edges we need to distribute the weights on has to be minimal, otherwise, we would need to use a new price from the given array. That way, our prices has to distribute on the edges that are on the shortest paths between $a$ and $b$ and $b$ and $c$, but an important thing to note is that in a graph, there can be multiple shortest paths.

Let's now ask ourselves: what would the shortest paths look like? What characteristics of the shortest path do we need in order to have them include the minimum price possible?

Ok, so the shortest paths can be one straight line from $a$ to $b$ and $b$ to $c$, that is the two paths $a \to b$ and $b \to c$ are not intersecting with only $b$ as a common node, otherwise, they would intersect in a considerable number of nodes, so our "optimal solution" would include at least one intersection point. We can fix a common node $x$, and our path would look like $a \to x$, $x \to b$, $b \to x$, then $x \to c$, with the common edges on the path $x \to b$ only. So, we would have to distribute the minimal prices on the edges that are on the path from $x \to b$ and then $a \to x$ and then $x \to c$ because our path would have $\text{dist}(a,x) + 2\text{dist}(b,x) + \text{dist}(c,x)$. So, we would store the shortest paths from $a, b,$ and $c$ using some shortest path algorithm like Dijkstra in 3 arrays, and iterate over $x$ and minimize $\text{pref}[\text{dist}(b,x)] + \text{pref}[\text{dist}(a,x) + \text{dist}(b,x) + \text{dist}(c,x)]$, where $\text{pref}$ is a prefix sum array, on the sorted array of prices.

## Conclusion

I hope you found these ideas helpful and not a waste of time.

From my naïve perception, the whole of Competitive Programming can be partitioned into pure problem-solving and thinking skills, and techniques/topics/algorithms that one may learn to help him tackle some problems like graphs, Number Theory, DP, ... . The former part, I see, is implicit to most problem solvers and it is just part of their unorganized train of thought that becomes more and more organized with practice. But, I think it can also be structured, and taught. You can consider this blog's content as a technique to have some kind of organization of the train of thought; it's a help in the "pure problem-solving and thinking skills" part, not the topics/algorithms part.

Here are some practice problems:
- [233B - Non-square Equation](https://codeforces.com/contest/233/problem/B)
- [1064D - Labyrinth](https://codeforces.com/contest/1064/problem/D)
- [1312E - Array Shrinking](https://codeforces.com/contest/1312/problem/E)
- [1632C - Strange Test](https://codeforces.com/contest/1632/problem/C)
- [1656B - Subtract Operation](https://codeforces.com/contest/1656/problem/B)
- [1656D - K-good](https://codeforces.com/contest/1656/problem/D)
