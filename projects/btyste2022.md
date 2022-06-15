---
layout: project
type: project
image: images/prism.png
title: SAConvnets
permalink: projects/saconvnets
# All dates must be YYYY-MM-DD format!
date: 2022-03-02
labels:
  - AI
  - MachineLearning
  - ClimateChange
summary: A novel approach to extreme weather forecasting
---

# Extreme precipitation forecasting using attention augmented convolutions

[Github](https://github.com/weichen-huang/climatenets)
[Arxiv](https://arxiv.org/abs/2201.13408)
[Poster](https://https://weichen-huang.github.io/images/btyste_poster_weichenhuang.pdf)

## Abstract

Extreme precipitation wreaks havoc throughout the world, causing billions of dollars in damage and uprooting communities, ecosystems, and economies. Accurate extreme precipitation prediction allows more time for preparation and disaster risk management for such extreme events.

In this paper,we focus on short-term extreme precipitation forecasting (up to a 12-hour ahead-of-time prediction) from a sequence of sea level pressure and zonal wind anomalies. Although existing machine learning approaches have shown promising results, the associated model and climate uncertainties may reduce their reliability. 

To address this issue, we propose a self-attention augmented convolution mechanism for extreme precipitation forecasting, systematically combining attention scores with traditional convolutions to enrich feature data and reduce the expected errors of the results. The proposed network architecture is further fused with a highway neural network layer to gain the benefits of unimpeded information flow across several layers. 

Our experimental results show that the framework outperforms classical convolutional models by *12%*. The proposed method increases machine learning as a tool for gaining insights into the physical causes of changing extremes, lowering
uncertainty in future forecasts.

