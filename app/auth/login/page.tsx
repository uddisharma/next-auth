import CardWrapper from "@/components/auth/card-wrapper";
import LoginForm from "@/components/auth/login-form";
import LoginOtpForm from "@/components/auth/login-form-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Register() {
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <LoginForm />
        </TabsContent>
        <TabsContent value="phone">
          <LoginOtpForm />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

export default Register;
