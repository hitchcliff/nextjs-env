import * as React from "react";
import { Formik, Form } from "formik";
import { Button, Stack } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useMutation } from "urql";

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!){
  register(options:{username:$username, password:$password}){
    user{
      id
      username
    }
    errors {
      field
      message
    }
  }
}
`;

interface RegisterProps {}

export default function Register({}: RegisterProps) {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return register({
            username: values.username,
            password: values.password,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack direction="column" spacing={4} align="left">
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
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
