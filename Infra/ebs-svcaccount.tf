
# create service account ebs csi driver
resource "kubernetes_service_account" "ebs_csi_driver_sa" {
  metadata {
    name      = "ebs-csi-driver-sa"
    namespace = "kube-system"
    labels = {
      app = "ebs-csi-driver"
    }
  }
}

# create role for the ebs csi driver service account
resource "kubernetes_role" "ebs_csi_driver_role" {
  metadata {
    name      = "ebs-csi-driver-role"
    namespace = "kube-system"
    labels = {
      app = "ebs-csi-driver"
    }
  }
  rule {
    api_groups = [""]
    resources  = ["pods", "pods/log"]
    verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
  }
  rule {
    api_groups = [""]
    resources  = ["secrets"]
    verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
  }
  rule {
    api_groups = [""]
    resources  = ["deployments", "replicasets"]
    verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
  }
}

#attach role to service account
resource "kubernetes_role_binding" "ebs_csi_driver_role_binding" {
  metadata {
    name      = "ebs-csi-driver-role-binding"
    namespace = "kube-system"
    labels = {
      app = "ebs-csi-driver"
    }
  }
  role_ref {
    kind     = "Role"
    name     = kubernetes_role.ebs_csi_driver_role.metadata[0].name
    api_group = "rbac.authorization.k8s.io"
  }
  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.ebs_csi_driver_sa.metadata[0].name
    namespace = kubernetes_service_account.ebs_csi_driver_sa.metadata[0].namespace
  }
}