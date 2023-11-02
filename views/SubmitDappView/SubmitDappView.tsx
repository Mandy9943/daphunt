"use client";
import Avatar from "@/components/UploadLogo/UploadLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const SubmitDappView = () => {
  const address = useAppSelector(selectUserAddress);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "Azulprusi",
      slogan: "Keep Us Secret",
      site: "https://supabase.com/partners/integrations/prisma#connection-pooling-with-supabase",
      apr: "200",
      description: "54;pk;p'lkjl;k,",
      tools: "swap pool",
      logo: null,
      twitter:
        "https://supabase.com/partners/integrations/prisma#connection-pooling-with-supabase",
      github: "",
    },
    onSubmit: async (values) => {
      const logo: File = values.logo as any;

      const fileExt = logo.name.split(".").pop();
      const filePath = `${
        values.name
      }-${Math.random()}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, logo);

      if (uploadError) {
        throw uploadError;
      }

      await toast.promise(
        api.post("/submit-dapp", {
          data: {
            ...values,
            logo: filePath,
          },
          address,
        }),
        {
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

  console.log("error", formik.errors);

  return (
    <div className="my-10">
      <h1 className="text-2xl mb-6">Luch a Dapp</h1>
      <h2 className="mb-1">Tell us about your dapp</h2>
      <div className="text-muted-foreground mb-8">
        Share basic info to help fellow devs get the gist of your awesome
        creation.
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
              <Label>Dapp APY</Label>
              <Input placeholder="200%" name="apr" {...comonProps} />
            </div>

            <div className="flex flex-col gap-3">
              <Label>
                Dapp tools{" "}
                <span className="text-muted-foreground">
                  (sparated by coma)
                </span>{" "}
              </Label>
              <textarea
                placeholder="pools, swaps, dollar cost averaging"
                name="tools"
                rows={3}
                className="p-3 rounded bg-transparent border"
                {...comonProps}
              />
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

          <Button className="mt-10" type="submit">
            Submit Dapp
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDappView;
