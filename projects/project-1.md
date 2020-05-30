---
layout: project
type: project
image: images/COVID.png
title: COVID-Efficientnet
permalink: projects/covidEfficientnet
# All dates must be YYYY-MM-DD format!
date: 2020-05-01
labels:
  - AI
  - MachineLearning
  - COVID
summary: My team developed a robotic mouse that won first place in the 2015 UH Micromouse competition.
---

# COVID-Efficientnet &rarr; a Pytorch Upgrade of [COVID-Next](https://github.com/velebit-ai/COVID-Next-Pytorch) and COVID-Net

[Github](https://github.com/weichen-huang/COVID-Efficientnet-Pytorch)
[Medium](https://medium.com/@weichen.huang.2020/covid-efficientnet-covid-19-detection-with-chest-x-ray-images-and-deep-learning-7eaaf25645bf)

Inspired by COVID-Next and the efficiency and mobility of Efficientnet, we are now open sourcing the upgraded Pytorch implementation of both called COVID-Efficientnet.

COVID-Efficientnet features an architecture that builds upon Efficientnet b7 architecture, an AutoML architecture for optimizing both accuracy and mobility.

Code was tested with Python 3.7.

### Dataset

We use the following datasets:
    * COVID ChestXray [dataset](https://github.com/ieee8023/covid-chestxray-dataset.git). Be aware this repository is constantly adding new images.
    * Kaggle RSNA pneumonia [dataset](https://www.kaggle.com/c/rsna-pneumonia-detection-challenge/data)



## Results

The following results were obtained on the dataset used in the original repo as of May 19 2020.
| Model                  | Accuracy |
|:-----------------:|:--------:|
| COVID-Net (Large) | 91.90%   |
| COVID-Next    | 94.76%   |
| **COVID-Efficientnet**    | **96.01%**   |

### Pretrained Weights

Pretrained weights are available at [weights](https://drive.google.com/open?id=1-uCQr7gcPUj2szKrDK1tSfv1BNj8XBHM)







