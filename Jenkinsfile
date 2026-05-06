pipeline {
    agent any // Runs on any available Jenkins agent

    environment {
        // Defines the Docker image names
        FRONTEND_IMAGE = "mern-frontend:latest"
        BACKEND_IMAGE = "mern-backend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls the latest code from GitHub
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Backend & Frontend Images using Docker Compose..."
                    // Uses docker-compose to build the images without starting them
                    sh 'docker-compose build'
                }
            }
        }

        stage('Deploy/Start Application') {
            steps {
                script {
                    echo "Starting the MERN Stack..."
                    // Stops any old running containers, then starts fresh ones in detached mode
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Execution Completed.'
            // Optional: you can add an instruction to clean up unused images here:
            // sh 'docker image prune -f'
        }
    }
}