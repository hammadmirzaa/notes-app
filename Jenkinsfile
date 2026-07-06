pipeline {
    agent {
        node {
            label 'docker-agent-node'
        }
    }

    options {
        skipDefaultCheckout(false)
    }

    stages {
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Skipping tests for now'
            }
        }

        stage('Deliver') {
            steps {
                sh 'echo "Delivery stage complete"'
            }
        }
    }
}
