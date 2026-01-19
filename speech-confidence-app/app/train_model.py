
import os
import glob
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from features import extract_features

def train():
    features = []
    labels = []

    print("Checking dataset...")

    confident_files = glob.glob("dataset/confident/*.wav")
    nervous_files = glob.glob("dataset/nervous/*.wav")

    print(f"Found {len(confident_files)} confident samples.")
    print(f"Found {len(nervous_files)} nervous samples.")

    # --- CONFIDENT (1) ---
    for file in confident_files:
        data = extract_features(file)
        if data:
            features.append(data["features_vector"])  # ✅ FIX
            labels.append(1)

    # --- NERVOUS (0) ---
    for file in nervous_files:
        data = extract_features(file)
        if data:
            features.append(data["features_vector"])  # ✅ FIX
            labels.append(0)

    if len(features) < 5:
        print("❌ Not enough data to train.")
        return

    X = np.array(features, dtype=np.float32)
    y = np.array(labels)

    print("Feature shape:", X.shape)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print("Training Random Forest...")
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)

    print(f"✅ Model trained | Accuracy: {acc * 100:.2f}%")

    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/confidence_model.pkl")
    print("💾 Model saved to models/confidence_model.pkl")

if __name__ == "__main__":
    train()


# import os
# import glob
# import joblib
# import numpy as np
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# from features import extract_features  # Import our helper

# def train():
#     features = []
#     labels = []

#     print("Checking dataset...")
    
#     # 1. Process Confident Files (Label = 1)
#     confident_files = glob.glob("dataset/confident/*.wav")
#     print(f"Found {len(confident_files)} confident samples.")
#     for file in confident_files:
#         data = extract_features(file)
#         if data:
#             features.append(data)
#             labels.append(1)

#     # 2. Process Nervous Files (Label = 0)
#     nervous_files = glob.glob("dataset/nervous/*.wav")
#     print(f"Found {len(nervous_files)} nervous samples.")
#     for file in nervous_files:
#         data = extract_features(file)
#         if data:
#             features.append(data)
#             labels.append(0)

#     if len(features) < 5:
#         print("❌ Error: Not enough data. Please add more WAV files to the dataset folders.")
#         return

#     # 3. Train the Model
#     X = np.array(features)
#     y = np.array(labels)

#     # Split into Training (80%) and Testing (20%)
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#     print("Training Random Forest Model...")
#     model = RandomForestClassifier(n_estimators=100)
#     model.fit(X_train, y_train)

#     # 4. Evaluate
#     predictions = model.predict(X_test)
#     acc = accuracy_score(y_test, predictions)
#     print(f"✅ Model Trained! Accuracy: {acc * 100:.2f}%")

#     # 5. Save the Model
#     os.makedirs("models", exist_ok=True)
#     joblib.dump(model, "models/confidence_model.pkl")
#     print("💾 Model saved to models/confidence_model.pkl")

# if __name__ == "__main__":
#     train()