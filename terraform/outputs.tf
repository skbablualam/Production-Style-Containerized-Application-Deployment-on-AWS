output "alb_dns" {
  value = aws_lb.app_alb.dns_name
}

output "ec2_public_ip" {
  value = aws_instance.k8s_node.public_ip
}
