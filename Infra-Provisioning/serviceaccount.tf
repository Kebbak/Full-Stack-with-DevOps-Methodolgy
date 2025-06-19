# resource "kubernetes_service_account" "app_service_account" {
#   metadata {
#     name      = "app-sa"
#     namespace = "netflix-clone"
#   }
# }


# # Define Role
# resource "kubernetes_role" "app_role" {
#   metadata {
#     name      = "app-role"
#     namespace = "netflix-clone"
#   }

#   rule {
#     api_groups = [""]
#     resources  = ["pods", "services", "secrets", "configmaps"]
#     verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
#   }

#   rule {
#     api_groups = ["apps"]
#     resources  = ["deployments", "replicasets"]
#     verbs      = ["get", "list", "watch", "create", "update", "patch", "delete"]
#   }
# }


# # Define RoleBinding
# resource "kubernetes_role_binding" "app_role_binding" {
#   metadata {
#     name      = "app-role-binding"
#     namespace = "netflix-clone"
#   }

#   role_ref {
#     kind      = "Role"
#     name      = kubernetes_role.app_role.metadata[0].name
#     api_group = "rbac.authorization.k8s.io"
#   }

#   subject {
#     kind      = "ServiceAccount"
#     name      = kubernetes_service_account.app_service_account.metadata[0].name
#     namespace = kubernetes_service_account.app_service_account.metadata[0].namespace
#   }
# }
