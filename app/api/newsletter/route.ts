import axios from "axios";

export const POST = async (req: Request) => {
  try {
    const email = (await req.json()).email;
    const dapfyHost = process.env.DAPFY_URL_HOST;
    await axios.post(`${dapfyHost}/api/newsletter`, {
      email: email,
    });
    return Response.json(
      { message: "success" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(error?.response?.data, {
      status: 500,
    });
  }
};
