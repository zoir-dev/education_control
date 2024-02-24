"use client";
import { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import Form from "./Form";

const AuthPage = () => {
  const [selected, setSelected] = useState("login");
  const [loading, setLoading] = useState(false)


  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Card className="min-h-[400px] w-[340px] max-w-full shadow-lg">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            color="primary"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(e: any) => setSelected(e)}
            isDisabled={loading}
          >
            <Tab key="login" title="Login">
              <Form loading={loading} setLoading={setLoading} />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <Form loading={loading} auth setLoading={setLoading} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthPage

