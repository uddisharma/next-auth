import CardWrapper from "@/components/auth/card-wrapper";
import RegisterForm from "@/components/auth/register-form";
import RegisterFormPhone from "@/components/auth/register-form-phone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Register() {
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="phone">
          <RegisterFormPhone />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

export default Register;
