import client from "@/utils/prisma";
import { addressSchema, dappSchema } from "@/utils/schemas";
import { z } from "zod";

export const POST = async (req: Request) => {
  const requestData = await req.json();
  console.log({ requestData });

  let {
    data: { logo, ...data },
    address,
  } = requestData;

  try {
    data = dappSchema.parse(data);
    address = addressSchema.parse({ address });
    logo = z.string().parse(logo);
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const ceratedProject = await client.project.create({
    data: {
      name: data.name,
      details: data.description,
      logo: logo,
      hidden: false,
      slogan: data.slogan,
      tools: data.tools,
      apr: Number(data.apr),
      site: data.site,
      githubUrl: data.github,
      twitterUrl: data.twitter,
      user: {
        connectOrCreate: {
          where: {
            address: address.address,
          },
          create: {
            address: address.address,
          },
        },
      },
      blockchain: {
        connect: {
          name: "Multiversx",
        },
      },
    },
  });

  return Response.json(
    {
      ceratedProject,
    },
    {
      status: 200,
    }
  );
};
