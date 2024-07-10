# Living Stokc Dynamics

This project is a Flask web application that dynamically generates and updates animals positions on a canvas.
The application features an input field for specifying the number of animals in living stock and a checkbox to toggle random coordinate generation.
The distance an animal travels every second is chosen randomly within a given range.
To simulate herd the dots are expected to be within certain region, e.g., ellipse travelling within a given field.

## Local Development
### Setup

1. **Clone the repository**:
    ```
    git clone https://github.com/arseny-sandaar/DataProcessing.git
    cd DataProcessing
    ```

2. **Install dependencies**:
    ```
    pip install -r requirements.txt
    ```

3. **Run the application**:
    ```
    python app.py
    ```

### Access the Application

Open your browser and go to `http://127.0.0.1:5000/`.
Docker image: https://hub.docker.com/repository/docker/arsenysandaar/living-stock-dynamics/general
