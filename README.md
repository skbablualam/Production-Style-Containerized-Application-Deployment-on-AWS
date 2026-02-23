# 🚀 Production-Grade Multi-AZ AWS EKS Platform Deployment

This project demonstrates an enterprise-style production deployment of a containerized YouTube Clone application on **Amazon EKS**, provisioned entirely using **Terraform (Infrastructure as Code)** and deployed through a fully automated **CI/CD pipeline using GitHub Actions**.

The architecture follows high availability, security, scalability, and DevOps best practices.

---

# 🏗️ Architecture Overview

## High-Level Design

```
                Internet
                    │
              AWS ALB (Ingress)
                    │
        ┌───────────┴───────────┐
        │                       │
   Public Subnet AZ-1      Public Subnet AZ-2
        │                       │
        └───────────┬───────────┘
                    │
            EKS Cluster (Private Subnets)
        ┌───────────┴───────────┐
        │                       │
 Managed Node Group       Managed Node Group
        │                       │
   Kubernetes Pods (YouTube Clone App)
                    │
              Amazon RDS (Optional)
                    │
              Private Subnets
```

---

# 🧱 Infrastructure Components

## Networking (Terraform Managed)

* Custom VPC
* 2 Public Subnets (Multi-AZ)
* 2 Private Subnets (Multi-AZ)
* Internet Gateway
* NAT Gateway
* Route Tables (Public & Private)
* Security Groups (Least Privilege)

## Kubernetes Platform

* Amazon EKS Cluster
* Managed Node Groups (Private Subnets)
* Cluster Autoscaler
* Horizontal Pod Autoscaler (HPA)
* IAM Roles for Service Accounts (IRSA)
* Kubernetes RBAC

## Load Balancing

* AWS Application Load Balancer (ALB)
* ALB Ingress Controller

## Container & Registry

* Dockerized YouTube Clone Application
* Amazon ECR (with lifecycle policies)

## CI/CD

* GitHub Actions
* Docker Build & Tag
* Push Image to ECR
* Deploy to EKS using kubectl
* Rolling Updates enabled

## Monitoring & Observability

* AWS CloudWatch
* Container Insights
* ALB metrics
* Log analysis for troubleshooting

---

# 🔐 Security Best Practices Implemented

* Private worker nodes (no public IPs)
* IAM least-privilege policies
* IRSA for secure pod-to-AWS access
* Security group isolation between tiers
* RDS in private subnet
* Terraform remote backend with state locking

---

# 📁 Repository Structure

```
.
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── eks/
│   │   ├── rds/
│   │   └── alb/
│   ├── main.tf
│   ├── variables.tf
│   └── backend.tf
│
├── app/
│   ├── Dockerfile
│   └── source-code/
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── hpa.yaml
│
├── .github/workflows/
│   └── ci-cd.yaml
│
└── README.md
```

---

# ⚙️ Implementation Steps

## 1️⃣ Prerequisites

* AWS CLI configured
* kubectl installed
* Terraform installed
* Docker installed
* GitHub repository secrets configured:

  * AWS_ACCESS_KEY_ID
  * AWS_SECRET_ACCESS_KEY
  * AWS_REGION
  * ECR_REPOSITORY

---

## 2️⃣ Provision Infrastructure (Terraform)

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This will provision:

* VPC
* Subnets
* NAT Gateway
* EKS Cluster
* Managed Node Groups
* IAM Roles
* ALB resources

---

## 3️⃣ Configure kubectl

```bash
aws eks update-kubeconfig --region <region> --name <cluster-name>
```

Verify:

```bash
kubectl get nodes
```

---

## 4️⃣ Deploy Application (Manual)

```bash
kubectl apply -f k8s/
```

OR

---

## 5️⃣ Automated CI/CD Deployment

On every push to main branch:

1. GitHub Actions triggers
2. Docker image is built
3. Image pushed to Amazon ECR
4. Deployment updated in EKS
5. Rolling update performed automatically

---

# 📈 Scaling Strategy

## Cluster Level

* Managed Node Groups
* Cluster Autoscaler enabled

## Application Level

* Horizontal Pod Autoscaler (HPA)
* CPU-based scaling

---

# 💰 Cost Optimization Strategy

* Minimal node count during testing
* Infrastructure destroyed after demo using:

```bash
terraform destroy
```

* ECR lifecycle policy enabled
* Resources tagged for tracking

---

# 🧪 Failure & High Availability Considerations

* Multi-AZ architecture
* Private worker nodes
* ALB health checks
* Rolling deployments
* Pod readiness & liveness probes

If one Availability Zone fails:

* Traffic automatically routes to healthy AZ
* Pods rescheduled by Kubernetes
* ALB maintains availability

---

# 🏆 Key Learning Outcomes

* Designing secure multi-AZ AWS architectures
* Managing EKS clusters in production-like setup
* Implementing CI/CD pipelines for Kubernetes workloads
* Applying Infrastructure as Code best practices
* Enforcing IAM and RBAC security models
* Monitoring and troubleshooting cloud-native workloads

---

# 🔮 Future Improvements

* Blue/Green Deployment
* ArgoCD for GitOps
* Prometheus + Grafana integration
* WAF integration
* Backup automation for RDS

---
