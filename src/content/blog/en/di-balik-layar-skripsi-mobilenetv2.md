# Behind the Thesis: Building an Indonesian Food Recognition Chatbot with MobileNetV2

![Page of web Chatbot](/img/blog/food/food.png)

My thesis is titled _Implementation of Transfer Learning MobileNetV2 on a Chatbot for Classification and Recognition of Indonesian Traditional Foods in English_, defended on September 20, 2025. In the paper, everything looks tidy: background, problem statement, methodology, results, conclusion. But like most theses, there was a lot of trial and error that never made it into the formal document. This post is about that, the challenges I ran into and the limitations that are still there.

---

## The Problem I Wanted to Solve

Foreign tourists often struggle to recognize Indonesian traditional food. Not just the name, but also the ingredients, taste, and cultural context behind it. Available information is also rarely presented in easy-to-understand English. From there, I figured a system that could recognize food from a photo and then explain it interactively could genuinely help people.

The plan: build an image classification model with CNN, transfer learning from MobileNetV2, then integrate it into an English-language chatbot.

## Challenge #1: An Imbalanced Dataset

The dataset I initially collected had 22 food classes, 150 images each, totaling 3,300 images. But once evaluated, the distribution wasn't nearly that clean. Some classes like fried chicken (ayam goreng) and meatball soup (bakso) had over 100 images each, while others like batagor and gado-gado had very few.

This imbalance had a direct impact. The model became more accurate on classes with more data, but underperformed on classes with limited data. I ended up trimming it down to 20 classes with roughly 150 images each to keep the dataset reasonably balanced, even though it meant a smaller dataset than originally planned.

## Challenge #2: Overfitting That Was Hard to Shake

With a dataset that small, overfitting became a real problem. During training, training accuracy kept climbing to 83%, but validation accuracy stalled around 79%. Training loss kept dropping, while validation loss stayed relatively higher. Classic signs of overfitting: the model was memorizing the training data but struggling to generalize to new data.

A few steps I took to mitigate this:

- **Dropout rate of 0.5** on the dense layer, so the model wouldn't rely too heavily on any specific combination of neurons
- **L2 regularization** to keep model weights from growing too large
- **A small learning rate (1e-4)**, since most of MobileNetV2's weights were already pretrained and I didn't want aggressive updates disrupting them
- **Feature extraction**, not full fine-tuning, so out of 2.42 million total parameters, only about 166,000 (6.8%) were trainable, the rest (93.2%) stayed frozen from the pretrained weights

These steps helped, but didn't fully close the gap between training and validation accuracy. That's one of the limitations I openly acknowledged in the conclusion.

## Challenge #3: Foods That Look Alike

This is the part I find most interesting. The model's most common mistakes weren't really about a flawed architecture, they came down to certain foods simply looking similar.

Some real examples from testing:

- **Chicken noodle soup (mie ayam) detected as fried noodles (mie goreng)**, because I didn't have a dedicated dataset for mie ayam, so the CNN defaulted to the visually closest category
- **Gudeg misidentified as rendang**, due to the shared dark brown color and similar texture
- Lighting conditions, camera angle, and plating variations also increased the chance of misclassification

From the confusion matrix, most classes like porridge (bubur), satay (sate), and soto were identified well (precision and recall above 0.9). But classes with limited data or high visual similarity, like gudeg and nasi padang, were the main source of errors. Overall model accuracy landed at 80%, with a macro avg F1-score of 77% and a weighted avg F1-score of 80%.

## Limitations That Still Remain

There are a few things I know aren't perfect yet, and I deliberately wrote about them openly in the thesis's conclusion:

1. **The dataset is relatively small.** 3,000 images across 20 classes (about 150 images per class) doesn't fully capture the visual variation within each class.
2. **No advanced data augmentation was used.** The dataset also wasn't expanded with more diverse sources.
3. **Limited fine-tuning.** I didn't compare MobileNetV2 against other architectures like EfficientNet or ResNet, even though prior research I reviewed showed EfficientNet reaching over 96% accuracy, albeit at a higher computational cost.
4. **The model is purely image-based.** There's no feature fusion with metadata (like main ingredients or food descriptions), and no bounding box annotations to help the model focus on the important parts of the food object.
5. **Per-class evaluation wasn't deep enough.** I didn't do a detailed, class-by-class analysis of error patterns.

## Why I'm Writing This Openly

One of the biggest lessons from this thesis wasn't really about MobileNetV2 or CRISP-DM, it was about the reality that a model that looks good on paper doesn't automatically generalize well in the real world. A small dataset, visually similar classes, and limited time for experimentation, these are all things that commonly happen in thesis-scale research, and I think writing about them honestly is more useful than glossing over them.

If you want to try the chatbot yourself, the app is live at [chatbot-food-tourism.streamlit.app](https://chatbot-food-tourism.streamlit.app/).

---

_Thesis: Implementation of Transfer Learning MobileNetV2 on a Chatbot for Classification and Recognition of Indonesian Traditional Foods in English. Naufal Andresya Kholish, Faculty of Industrial Technology, Gunadarma University, 2025._
