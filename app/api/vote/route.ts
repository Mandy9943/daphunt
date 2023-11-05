import client from "@/utils/prisma";
import { addressSchema } from "@/utils/schemas";
import { ErrorMessage } from "@/utils/utils";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    let { address, id: projectId } = await req.json();
    try {
      address = addressSchema.parse({ address });
      projectId = z.number().positive().parse(projectId);
    } catch (error) {
      return Response.json({ error: error }, { status: 400 });
    }

    const user = await client.user.upsert({
      where: {
        address: address.address,
      },
      create: {
        address: address.address,
      },
      update: {},
    });
    const projectVoted = await client.projectsVoted.findFirst({
      where: {
        userId: user.id,
        projectId: projectId,
      },
    });

    if (projectVoted) {
      return Response.json(
        { error: "You already voted for this project" },
        { status: 400 }
      );
    }

    await client.projectsVoted.create({
      data: {
        projectId: projectId,
        userId: user.id,
      },
    });

    return Response.json({ data: "success" }, { status: 200 });
  } catch (error) {
    console.log("error", error);

    return Response.json(
      { error: ErrorMessage(error, "Error while voting") },
      { status: 500 }
    );
  }
};
