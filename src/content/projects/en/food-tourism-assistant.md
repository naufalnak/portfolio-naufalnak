# Overview

Food Tourism Assistant Indonesia is a Streamlit-based app that helps foreign tourists explore Indonesian cuisine through AI. Users simply upload a photo of food, and the system identifies the dish while providing a full explanation of its ingredients, flavor profile, and cultural context.

# The Problem

Foreign tourists often struggle to understand Indonesian food: unfamiliar names, ingredients they have never seen, and different eating customs. This app serves as a personal culinary guide accessible at any time.

# Tech Stack

- **Language**: Python
- **Framework**: Streamlit
- **ML Model**: TensorFlow Lite (TFLite) for image classification
- **Data**: NumPy + curated JSON database as food knowledge base
- **Deployment**: Streamlit Community Cloud

# How It Works

1. User uploads a food photo
2. The TFLite model classifies the image and identifies the dish
3. The system queries a JSON database containing detailed information on each dish
4. An interactive chatbot explains the ingredients, flavor profile, and cultural context

# Key Features

- Image recognition using a TFLite model optimized for mobile/edge
- Knowledge base with curated Indonesian culinary information
- Interactive chatbot interface for follow-up questions
- Free deployment via Streamlit Community Cloud

# What I Learned

This project taught me the end-to-end machine learning workflow: from training, optimizing the model to TFLite, to integrating it into a web application. I also learned the importance of a **well-structured knowledge base** as the backbone of a chatbot, rather than relying solely on a raw language model.
