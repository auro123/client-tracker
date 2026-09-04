import { db } from "../src/lib/db";

async function main() {
  const project = await db.project.create({
    data: {
      name: "Acme Corp onboarding",
      clientName: "Acme Corp",
      stageId: "contacted",
      tasks: {
        create: [
          {
            title: "Send welcome email",
            dueDate: new Date(Date.UTC(2026, 8, 5)),
            sortOrder: 0,
          },
          {
            title: "Schedule kickoff call",
            dueDate: new Date(Date.UTC(2026, 8, 10)),
            sortOrder: 1,
          },
          {
            title: "Collect brand assets",
            dueDate: new Date(Date.UTC(2026, 8, 17)),
            sortOrder: 2,
          },
        ],
      },
    },
  });

  console.log(`Seeded project "${project.name}" (${project.id}) with 3 tasks.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
