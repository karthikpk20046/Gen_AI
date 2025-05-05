# Use Python 3.9 as the base image
FROM python:3.9

# Set working directory to /app
WORKDIR /app

# Copy all files from your project to /app in the container
COPY . .

# Install required Python packages
RUN pip install fastapi uvicorn

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]