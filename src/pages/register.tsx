import * as React from "react";
import { Formik, Form } from "formik";
import { Button, Stack } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useRegisterMutation } from "src/generated/graphql";
import { toErrorMap } from "src/util/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

export default function Register({}: RegisterProps) {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await register(values);
          if (data?.register.errors) {
            setErrors(toErrorMap(data.register.errors));
          } else if (data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack direction="column" spacing={4} align="left">
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
                type="text"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Button
                isLoading={isSubmitting}
                colorScheme="teal"
                size="md"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
