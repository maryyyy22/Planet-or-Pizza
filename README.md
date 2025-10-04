# 🌌 ExoLearn: AI-Powered Exoplanet Discovery & Interactive Platform  
<img width="1874" height="900" alt="image" src="https://github.com/user-attachments/assets/e85784e2-a694-4877-8306-e1c6d699a633" />


## 📖 Project Overview  
ExoLearn is an **interactive web-based platform** that combines **education, visualization, and AI-powered exoplanet detection**.  

- **For Beginners:**  
  - Learn planetary facts (size, orbit, surface temperature, etc.).  
  - Explore planets with **Augmented Reality (AR)**.
  - <img width="344" height="754" alt="image" src="https://github.com/user-attachments/assets/6adc88a6-f327-4a6d-af1c-9d9b5145aa12" />

  - Play the gamified feature: *“Planet or Pizza?”*.  

- **For Researchers:**  
  - A **CNN–Transformer hybrid model** trained on **NASA’s Kepler & TESS datasets**.  
  - Automatic **exoplanet detection from light curves**.  
  - Predicts **planetary properties** (radius, mass, density, orbital period, luminosity, surface temperature).  
  - Built-in **Explainable AI** tools (LIME, uncertainty estimation, confidence scoring).  

---

## ⚙️ How It Works  

### 1. Data Analysis & Preprocessing (Kepler Dataset)  
The **Kepler mission** provides *photometric light curves* — brightness vs. time graphs of stars.  
To prepare them for AI models, we apply:  

- 🔹 Outlier removal (removing false signals / errors).  
- 🔹 Normalization (standardizing brightness values).  
- 🔹 Smoothing filters (reduce noise, highlight dips).  
- 🔹 Segmentation (fixed window length for uniform input).  
- 🔹 Graph-to-Image conversion (light curves → images for CNN input).  

✅ This produces a **clean, uniform dataset** ready for deep learning.  

### 2. CNN–Transformer Classifier  
- Input: Preprocessed light curve images.  
- Output:  
  - `1 = Planet`  
  - `0 = Non-planet`  
- Accuracy: **93%**  
- **CNN** → extracts spatial features (transit shape/depth).  
- **Transformer** → captures temporal dependencies (periodic dips).
- ![WhatsApp Image 2025-10-04 at 08 46 23_c1f39896](https://github.com/user-attachments/assets/3bb86e34-96f3-448e-9d82-193009aaa9f5)
-![WhatsApp Image 2025-10-04 at 08 46 23_7c0493ee](https://github.com/user-attachments/assets/1874da7a-75fc-405b-873f-20a12ad29d1c)
![WhatsApp Image 2025-10-04 at 08 46 23_30d4bdfd](https://github.com/user-attachments/assets/d9eca691-02b6-44d2-b1e7-671746e64987)




### 3. Planetary Property Estimation Model  
After detection, a regression-based neural model predicts:  
- Radius  
- Mass  
- Density  
- Orbital Period  
- Luminosity  
- Surface Temperature  

Cross-checked with **NASA’s Exoplanet Archive**.  

### 4. Explainable AI (XAI)  
- **LIME** → highlights curve regions influencing predictions.  
- **Uncertainty Estimation** → gives confidence intervals.  
- **Confidence Score** → adds reliability measure.  

---

## 🌟 Benefits  

- 🚀 **Automates exoplanet detection** (faster than manual analysis).  
- 🎯 **High accuracy (93%)** in classifying planets vs. non-planets.  
- 🔬 **Property estimation** enables deeper astrophysical insights.  
- 📊 **Standardized datasets** improve scalability.  
- 🛰️ **Transparent AI** thanks to explainability tools.  
- 🎮 **Engagement & learning** through AR and gamification.  

---

## 📂 Data Sources  

- **Kepler Mission Data** → Photometric light curves.  
- **TESS Mission Data** → Additional training/validation.  
- **NASA Exoplanet Archive** → Ground truth for planetary properties.
- ![WhatsApp Image 2025-10-04 at 08 55 14_639c916f](https://github.com/user-attachments/assets/1930e347-b11c-4a15-922f-fa3a98aff9b4)
- ![WhatsApp Image 2025-10-04 at 08 57 31_699bb596](https://github.com/user-attachments/assets/038aecbf-77b6-4f47-82c4-9cb8bb6b418c)
- ![WhatsApp Image 2025-10-04 at 08 46 25_53e490a6](https://github.com/user-attachments/assets/aa37ca03-7595-4d0b-88f7-7d2dcbd989f0)
- ![WhatsApp Image 2025-10-04 at 08 46 24_de9e1afa](https://github.com/user-attachments/assets/cf184c28-62f3-48ef-a5bc-b1f1fa68a5b5)





---

## 🚀 Future Directions  

- Expand to **JWST & PLATO** missions.  
- Enhance **AR features** for immersive learning.  
- Real-time detection for **uploaded light curves**.  

---

