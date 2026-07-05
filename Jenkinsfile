pipeline {
    agent {
        node {
            label 'docker-agent-node'
        }
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Install Backend Dependencies') {
            steps {
                echo "Installing backend dependencies..."
                dir('backend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                echo "Building backend..."
                dir('backend') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo "Installing frontend dependencies..."
                dir('frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Building frontend..."
                dir('frontend') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                dir('backend') {
                    sh '''
                        npm test
                    '''
                }
            }
        }

        stage('Deliver') {
            steps {
                echo "Delivery stage..."
                sh 'echo "Doing delivery stuff..."'
            }
        }
    }
}
