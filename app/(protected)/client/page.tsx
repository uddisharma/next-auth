"use client";

import UserInfo from "@/components/others/user-info";
import { currentUser } from "@/lib/auth";

const ClientPage = async () => {
  const user = await currentUser();

  return <UserInfo label="📱 Client Component" user={user} />;
};

export default ClientPage;
