import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Layout from "../components/layout/layout.jsx";
import imgContactUs from "../assets/images/contactUs.png";

function ContactUs() {
  const [state, handleSubmit] = useForm("mblgvrka");

  return (
    <Layout>
      <div className="bg-gray-100 flex flex-col lg:flex-row items-center justify-center gap-10 p-6 lg:p-12 min-h-screen">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Drop us a Message
          </h2>

          {state.succeeded ? (
            <p className="text-green-600 text-lg font-semibold">
              Thanks for your message!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Write your message here..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={imgContactUs}
            alt="Contact Illustration"
            className="rounded-xl w-full max-w-md "
          />
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
