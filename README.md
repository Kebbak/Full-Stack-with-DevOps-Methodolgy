
A fully Functional Netflix-Inspired Netflix Replica video streaming platform built using MERN Stack(MongoDB, Express, React,Nodejs)
with complete DevOps automation using Docker, Github Acyions, ArgoCD and AWS EKS.



📦 __How to Run Locally (Dev Mode)__

git clone https://github.com/Kebba91/Netflix

__Start Backend__

cd backend
npm install 
node server.js

__Start Frontend__
cd frontend
npm install
npm start

🛠 Tech Stack

__Frontend__:
	•	React
	•	Tailwind CSS / Material UI
	•	Video.js (HLS player)

__Backend__:
	•	Node.js
	•	Express
	•	MongoDB
	•	JWT Authentication
	•	Stripe / PayPal (mocked)
	•	TMDB API

__DevOps__:
	•	Docker (frontend & backend)
	•	GitHub Actions (CI)
	•	ArgoCD (CD with GitOps)
	•	Kubernetes (AWS EKS)
	•	Prometheus + Grafana (Monitoring)
	•	AWS Cloud (EKS, S3, etc.)

⸻

🚀 __Key Features__

🔐 __Authentication__:
	•	JWT-based login & registration
	•	Role-based access control (User / Admin)

📺 __Streaming__:
	•	HLS video streaming via Video.js
	•	Movie browsing by genre
	•	Detailed movie pages
	•	Watchlist support

🧑‍💻 __Admin Features__:
	•	Secure admin panel
	•	Upload and manage movies

🧱 __DevOps & Deployment__:
	•	Dockerized microservices (frontend/backend)
	•	CI/CD pipeline using GitHub Actions and ArgoCD
        •       Terraform (Infrasture Provision)
	•	Deployed to AWS EKS (Kubernetes)
	•	Real-time monitoring with Prometheus and Grafana

📷 __Screenshots__

(Optional – add if available)


📁 __Project Structure__
├── client/               # React Frontend
├── server/               # Node.js Backend API
├── deploy/               # Kubernetes manifests or Helm charts Terraform
├── .github/workflows/    # GitHub Actions
└── README.md             # ReadMe!


