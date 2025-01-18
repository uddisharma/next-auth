import UserForm from "@/components/others/UserForm1";

export default function NewUserPage() {
  return (
    <main className="p-4 sm:p-6 ">
      <h1 className="text-2xl font-semibold mb-6">Add New User</h1>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-[1px] border-whiteGray">
        <UserForm />
      </div>
    </main>
  );
}
