import { db } from "@/lib/db";
import { Resource, UserRole } from "@prisma/client";

async function main() {
  // Create Users
  const users = await Promise.all([
    db.user.create({
      data: {
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        gender: "MALE",
        age: 30,
        location: "New York",
        pinCode: 10001,
        loginType: "GOOGLE",
        source: "web",
        lastLogin: new Date(),
        otp: 123456,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    db.user.create({
      data: {
        name: "Jane Smith",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        gender: "FEMALE",
        age: 28,
        location: "Los Angeles",
        pinCode: 90001,
        loginType: "PHONE",
        source: "mobile",
        lastLogin: new Date(),
        otp: 654321,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    db.user.create({
      data: {
        name: "Alice Johnson",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "5551234567",
        gender: "FEMALE",
        age: 25,
        location: "Chicago",
        pinCode: 60601,
        loginType: "GOOGLE",
        source: "web",
        lastLogin: new Date(),
        otp: 111222,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    db.user.create({
      data: {
        name: "Bob Brown",
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        phone: "5557654321",
        gender: "MALE",
        age: 35,
        location: "Miami",
        pinCode: 33101,
        loginType: "PHONE",
        source: "mobile",
        lastLogin: new Date(),
        otp: 333444,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
  ]);

  // Create Accounts
  await Promise.all([
    db.account.create({
      data: {
        userId: users[0].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "google-account-id-1",
        refresh_token: "refresh-token-1",
        access_token: "access-token-1",
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        token_type: "Bearer",
        scope: "email profile",
        id_token: "id-token-1",
        session_state: "active",
      },
    }),
    db.account.create({
      data: {
        userId: users[1].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "google-account-id-2",
        refresh_token: "refresh-token-2",
        access_token: "access-token-2",
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        token_type: "Bearer",
        scope: "email profile",
        id_token: "id-token-2",
        session_state: "active",
      },
    }),
    db.account.create({
      data: {
        userId: users[2].id,
        type: "oauth",
        provider: "facebook",
        providerAccountId: "facebook-account-id-1",
        refresh_token: "refresh-token-3",
        access_token: "access-token-3",
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        token_type: "Bearer",
        scope: "email public_profile",
        id_token: "id-token-3",
        session_state: "active",
      },
    }),
  ]);

  // Create Blogs
  await Promise.all([
    db.blog.create({
      data: {
        title: "My First Blog",
        content: "This is the content of my first blog.",
        authorId: users[0].id,
        category: "Personal",
        subCategory: "Life",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        isActive: true,
      },
    }),
    db.blog.create({
      data: {
        title: "Tech Trends 2023",
        content: "Exploring the latest trends in technology.",
        authorId: users[1].id,
        category: "Technology",
        subCategory: "Trends",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        isActive: true,
      },
    }),
    db.blog.create({
      data: {
        title: "Travel Diaries",
        content: "Sharing my travel experiences around the world.",
        authorId: users[2].id,
        category: "Travel",
        subCategory: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        isActive: true,
      },
    }),
  ]);

  // Create Reports
  await Promise.all([
    db.report.create({
      data: {
        userId: users[0].id,
        startTime: new Date(),
        endTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sessionId: users[0].id.toString(),
        recommendation: { message: "Keep up the good work!" },
        questions: [
          {
            question: "How satisfied are you with our service?",
            answer: "Very Satisfied",
          },
        ],

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    db.report.create({
      data: {
        userId: users[1].id,
        startTime: new Date(),
        endTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sessionId: users[1].id.toString(),
        recommendation: { message: "Consider improving your response time." },
        questions: [
          {
            question: "What features would you like to see improved?",
            answer: "Feature A",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create Questions
  const questions = await Promise.all([
    db.question.create({
      data: {
        text: "How satisfied are you with our service?",
        sequence: 1,
        questionType: "SINGLE_SELECT",
        required: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    db.question.create({
      data: {
        text: "What features would you like to see improved?",
        sequence: 2,
        questionType: "MULTIPLE_SELECT",
        required: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create Options
  await Promise.all([
    db.option.create({
      data: {
        questionId: questions[0].id,
        text: "Very Satisfied",
        sequence: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    db.option.create({
      data: {
        questionId: questions[0].id,
        text: "Satisfied",
        sequence: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    db.option.create({
      data: {
        questionId: questions[1].id,
        text: "Feature A",
        sequence: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    db.option.create({
      data: {
        questionId: questions[1].id,
        text: "Feature B",
        sequence: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  const permissions = [
    { role: UserRole.SUPER_ADMIN, resource: Resource.BLOGS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.SUPER_ADMIN, resource: Resource.REPORTS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.SUPER_ADMIN, resource: Resource.QUESTIONS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.SUPER_ADMIN, resource: Resource.USERS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },

    { role: UserRole.ADMIN, resource: Resource.BLOGS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.ADMIN, resource: Resource.REPORTS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.ADMIN, resource: Resource.QUESTIONS, canCreate: true, canRead: true, canUpdate: true, canDelete: true },
    { role: UserRole.ADMIN, resource: Resource.USERS, canCreate: true, canRead: true, canUpdate: true, canDelete: false },

    { role: UserRole.EDITOR, resource: Resource.BLOGS, canCreate: true, canRead: true, canUpdate: true, canDelete: false },
    { role: UserRole.EDITOR, resource: Resource.REPORTS, canCreate: true, canRead: true, canUpdate: false, canDelete: false },
    { role: UserRole.EDITOR, resource: Resource.QUESTIONS, canCreate: true, canRead: true, canUpdate: true, canDelete: false },
    { role: UserRole.EDITOR, resource: Resource.USERS, canCreate: false, canRead: true, canUpdate: false, canDelete: false },

    { role: UserRole.USER, resource: Resource.BLOGS, canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { role: UserRole.USER, resource: Resource.REPORTS, canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { role: UserRole.USER, resource: Resource.QUESTIONS, canCreate: false, canRead: true, canUpdate: false, canDelete: false },
    { role: UserRole.USER, resource: Resource.USERS, canCreate: false, canRead: false, canUpdate: false, canDelete: false },
  ];


  for (const permission of permissions) {
    await db.permission.upsert({
      where: {
        role_resource: {
          role: permission.role,
          resource: permission.resource,
        },
      },
      update: {},
      create: {
        role: permission.role,
        resource: permission.resource,
        canCreate: permission.canCreate,
        canRead: permission.canRead,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
