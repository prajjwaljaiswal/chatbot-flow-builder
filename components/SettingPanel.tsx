"use client";

import { MoveLeftIcon } from "lucide-react";
import { useBuilder } from "@/context/builderContext";
import { Field, Form, Formik } from "formik";

export default function SettingPanel() {
  const { handleBack } = useBuilder();
  return (
    <div className="w-1/4 h-full p-4 border-l border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div style={{ cursor: "pointer" }} onClick={handleBack}>
          <MoveLeftIcon />
        </div>
        <h1 className="text-sm font-medium mx-auto">Message</h1>
      </div>
      <hr className="w-full" />

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-sm font-medium">Message Content</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <Formik
              initialValues={{ messageContent: "" }}
              onSubmit={(values) => console.log(values)}
            >
              <Form>
                <Field
                  name="messageContent"
                  as="textarea"
                  placeholder="Enter your message"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={5}
                />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
