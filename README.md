📦 How to Run Locally (Dev Mode)
git clone https://github.com/yourusername/netflix-clone-devops.git

__Start Backend__
cd backend
npm install 
node server.js

__Start Frontend__
cd frontend
npm install
npm start

🛠 Tech Stack

Frontend:
	•	React
	•	Tailwind CSS / Material UI
	•	Video.js (HLS player)

Backend:
	•	Node.js
	•	Express
	•	MongoDB
	•	JWT Authentication
	•	Stripe / PayPal (mocked)
	•	TMDB API

DevOps:
	•	Docker (frontend & backend)
	•	GitHub Actions (CI)
	•	ArgoCD (CD with GitOps)
	•	Kubernetes (AWS EKS)
	•	Prometheus + Grafana (Monitoring)
	•	AWS Cloud (EKS, S3, etc.)

⸻

🚀 Key Features

🔐 Authentication:
	•	JWT-based login & registration
	•	Role-based access control (User / Admin)

📺 Streaming:
	•	HLS video streaming via Video.js
	•	Movie browsing by genre
	•	Detailed movie pages
	•	Watchlist support

🧑‍💻 Admin Features:
	•	Secure admin panel
	•	Upload and manage movies

🧱 DevOps & Deployment:
	•	Dockerized microservices (frontend/backend)
	•	CI/CD pipeline using GitHub Actions and ArgoCD
  • Terraform (Infrasture Provision)
	•	Deployed to AWS EKS (Kubernetes)
	•	Real-time monitoring with Prometheus and Grafana

📷 Screenshots

(Optional – add if available)


📁 Project Structure
├── client/               # React Frontend
├── server/               # Node.js Backend API
├── deploy/               # Kubernetes manifests or Helm charts Terraform
├── .github/workflows/    # GitHub Actions
└── README.md             # ReadMe!


