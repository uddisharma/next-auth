"use client";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowed: Boolean;
}

export const RoleGate = ({ children, allowed }: RoleGateProps) => {

  if (allowed === false) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }
  return <>{children}</>;
};
