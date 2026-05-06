pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "mern-frontend:latest"
        BACKEND_IMAGE = "mern-backend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Backend & Frontend Images using Docker Compose..."
                    // Changed from sh to bat for Windows
                    bat 'docker-compose build'
                }
            }
        }

        stage('Deploy/Start Application') {
            steps {
                script {
                    echo "Starting the MERN Stack..."
                    // Changed from sh to bat for Windows
                    bat 'docker-compose down'
                    bat 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Execution Completed.'
        }
    }
}