"use client";
import Avatar from "@/components/UploadLogo/UploadLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthentication from "@/hooks/useAuthentication";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import api from "@/services/api";
import { dappSchema } from "@/utils/schemas";
import { ErrorMessage } from "@/utils/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ToolsSelector from "./ToolsSelector";

const SubmitDappView = () => {
  const { isLoggedIn } = useAuthentication();
  const address = useAppSelector(selectUserAddress);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      slogan: "",
      site: "",
      apr: "",
      description: "",
      tools: [],
      logo: null,
      twitter: "",
      github: "",
    },
    onSubmit: async (values) => {
      const logo: File = values.logo as any;

      const fileExt = logo.name.split(".").pop();
      const filePath = `${values.name.trim()}-${Math.random()}-${Math.random()}.${fileExt}`;

      await toast.promise(
        Promise.all([
          supabase.storage.from("logos").upload(filePath, logo),
          api.post("/submit-dapp", {
            data: {
              ...values,
              logo: filePath,
            },
            address,
          }),
        ]),
        {
          success: "Dapp submitted!",
          pending: "Submitting dapp...",
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              return ErrorMessage(data);
            },
          },
        }
      );
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },

    validationSchema: toFormikValidationSchema(dappSchema),
  });

  const comonProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  const onChageLogo = (file: File) => {
    formik.setFieldValue("logo", file);
  };

  const handleToolsChange = (tools: string[]) => {
    formik.setFieldValue("tools", tools);
  };
  console.log("erros", formik.errors);

  return (
    <div className="my-10">
      <h1 className="text-2xl mb-6">Luch your dApp</h1>
      <h2 className="mb-1">Tell us about your dapp</h2>
      <div className="text-muted-foreground mb-8">
        Share basic info to help users find your awesome creation.
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <Avatar id={5} onChage={onChageLogo} size={156} />

          <div className="flex gap-8 flex-col">
            <div className="flex flex-col gap-3">
              <Label>Dapp name</Label>
              <Input placeholder="Dapfy" name="name" {...comonProps} />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Catchy slogan 😎</Label>
              <Input
                placeholder="Best platform to invest your crypto"
                name="slogan"
                {...comonProps}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Dapp website URL</Label>
              <Input
                placeholder="https://myawesomedapp.com/"
                name="site"
                {...comonProps}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>
                Dapp APY <span className="text-muted-foreground">(in %)</span>{" "}
              </Label>
              <Input placeholder="200" name="apr" {...comonProps} />
            </div>

            <div className="flex flex-col gap-3">
              <Label>
                Dapp tools{" "}
                <span className="text-muted-foreground">
                  (use enter or click to add a new tool)
                </span>{" "}
              </Label>
              <ToolsSelector onToolsChange={handleToolsChange} />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Quick Description</Label>
              <textarea
                placeholder="Briefly explain what your dapp does."
                name="description"
                rows={6}
                className="p-3 rounded bg-transparent border"
                {...comonProps}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Twitter URL (optional)</Label>
              <Input
                placeholder="Briefly explain what your dapp does."
                name="twitter"
                {...comonProps}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Github repo URL (optional)</Label>
              <Input
                placeholder="Briefly explain what your dapp does."
                name="github"
                {...comonProps}
              />
            </div>
          </div>

          <Button className="mt-10" type="submit" disabled={!isLoggedIn}>
            Submit Dapp
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDappView;
