# create service account for the application
resource "kubernetes_service_account" "app_service_account" {
  metadata {
    name      = "app-service-account"
    namespace = "netflix-clone"
    labels = {
      app = "netflix-clone"
    }
  }
}

# create role for the service account
resource "kubernetes_role" "app_role" {
  metadata {
    name      = "app-role"
    namespace = "netflix-clone"
    labels = {
      app = "netflix-clone"
    }
  }
    rule {
        api_groups = [""]
        resources  = ["pods", "pods/log"], ""
        verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
    }
    rule {
        api_groups = [""]
        resources  = ["secrets"]
        verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
    }
    rule {
        api_groups = [""]
        resources  = ["configmaps"]
        verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
    }
    rule {
        api_groups = [""]
        resources  = ["services"]
        verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
    }
    rule {
        api_groups = [""]
        resources  = ["deployments", "replicasets"]
        verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
    }
}

# create role binding for the service account
resource "kubernetes_role_binding" "app_role_binding" {
  metadata {
    name      = "app-role-binding"
    namespace = "netflix-clone"
    labels = {
      app = "netflix-clone"
    }
  }
  role_ref {
    kind     = "Role"
    name     = kubernetes_role.app_role.metadata[0].name
    api_group = "rbac.authorization.k8s.io"
  }
  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.app_service_account.metadata[0].name
    namespace = kubernetes_service_account.app_service_account.metadata[0].namespace
  }
  depends_on = [
    kubernetes_service_account.app_service_account,
    kubernetes_role.app_role
  ]
}